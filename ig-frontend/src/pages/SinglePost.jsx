import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Post from '../components/Post'

export default function SinglePost(props) {

    const { id } = props.match.params
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(null)

    //Used for the EDIT form
    const [description, setDescription] = useState('');

    const fetchPost = async () => {
        try {
            await axios.get(`http://localhost:1337/posts/${id}`)
                .then(response => {
                    setLoading(false)
                    setPost(response.data)
                    setDescription(response.data.description)
                })
        } catch (err) {
            if (err.response) {
                const { data } = err.response
                setLoading(false)
                setError({ message: data.message, status: data.statusCode })
            } else {
                console.log(err);
            }
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:1337/posts/${id}`)
                .then(response => {
                    console.log(response)
                    alert('Deleted registry successfully')
                    props.history.push('/')
                })
        } catch (error) {
            if (error.message) {
                console.log(error.message)
            } else {
                console.log(error);
            }
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:1337/posts/${id}`, { description })
                .then(response => {
                    console.log(response)
                    //Fetch Posts to re-render description
                    fetchPost();
                })
        } catch (error) {

        }
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
                            <button onClick={handleDelete}>Delete this Post</button>
                            <button onClick={() => setEdit(true) }>Edit this Post</button>

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
