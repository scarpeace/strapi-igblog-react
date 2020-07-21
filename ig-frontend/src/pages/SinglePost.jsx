import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Post from '../components/Post'

export default function SinglePost(props) {

    const { id } = props.match.params
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await axios.get(`http://localhost:1337/posts/${id}`)
                    .then(response => {
                        setPost(response.data)
                    })
            } catch (err) {
                if (err.response) {
                    console.log('err.response', err.response)
                } else {
                    console.log(err);
                }
            }
        }

        fetchPosts();
    }, [])

    return (
        <div>
            {console.log(post.image)}
            <Post
                description={post.description}
                imgUrl={post.image && post.image.url}
                likes={post.likes}
            />
        </div>
    )
}
