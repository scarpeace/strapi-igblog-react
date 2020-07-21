import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import Post from '../components/Post'

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const getPosts = async () => {
            const response = await fetch('http://localhost:1337/posts')
            const data = await response.json();

            setPosts(data);
        }

        getPosts();
    }, [])

    return (
        <div className="Home">
            {posts.map((post, index) => (
                <Link key={index} to={`/${post.id}`}>
                <Post likes={post.likes} description={post.description} imgUrl={post.image && post.image.url} />
                </Link>
            ))}
        </div>
    );
}

