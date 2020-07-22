import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { UserContext } from '../context/UserContext'
import Post from '../components/Post'

export default function SinglePost(props) {

    const { id } = props.match.params
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);

    //Used for the EDIT form
    const [description, setDescription] = useState('');

    const fetchPost = async () => {

        await axios.get(`http://localhost:1337/posts/${id}`)
            .then(response => {
                setLoading(false)
                setPost(response.data)
                setDescription(response.data.description)
            }).catch(err => {
                console.log(err.response)
                setError(err.response.data.message[0].messages[0].message)
            })
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:1337/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        })
            .then(response => {
                console.log(response)
                alert('Deleted registry successfully')
                props.history.push('/')
            }).catch(err => {
                console.log(err.response)
                setError(err.response.data.message[0].messages[0].message)
            })
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:1337/posts/${id}`, { description }, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        })
            .then(response => {
                console.log(response)
                //Fetch Posts to re-render description
                fetchPost();
            }).catch(err => {
                console.log(err.response)
                setError(err.response.data.message[0].messages[0].message)
            })
    }

    useEffect(() => {
        fetchPost();
    }, [])


    return (
        <div>
            {loading && <p>Loading...</p>}

            {!loading &&

                <>
                    {post.id &&
                        <>
                            <Post
                                description={post.description}
                                imgUrl={post.image && post.image.url}
                                likes={post.likes}
                            />
                            {user && <>
                                <button onClick={handleDelete}>Delete this Post</button>
                                <button onClick={() => setEdit(true)}>Edit this Post</button>

                                {edit &&
                                    <form onSubmit={handleEditSubmit}>
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                            placeholder='New Description'
                                        />
                                        <button type='submit'>Confirm</button>
                                    </form>
                                }
                            </>
                            }

                        </>
                    }
                    {error &&
                        <>
                            <h1>Something went Wrong:</h1>
                            <p>{error.status}</p>
                            <p>{error.message}</p>
                        </>
                    }

                </>

            }

        </div>
    )
}
