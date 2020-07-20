import React from 'react'



const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => {
    return `${API_URL}${url}`

}

export default function Post(props) {

    const { description, likes, image: { url } } = props.post
    return (
        <div className='post'>
            <img className='image' src={formatImageUrl(url)} alt="Post Foto" />
            <h4>{description}</h4>
            <div>
                <span>Likes: {likes}</span>
            </div>
        </div>
    )
}
