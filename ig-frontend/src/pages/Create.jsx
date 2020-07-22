import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

export default function Create() {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const { user } = useContext(UserContext)

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            setError('Please log in to perform this action')
        }

        if (!description) {
            setError('Please add a Description')
            return
        }
        if (!file) {
            setError('Please add a file')
            return
        }

        const formData = new FormData();

        //To send multipart data to Strapi we need to have a field name DATA
        formData.set('data', JSON.stringify({ description }));

        //Files is a Strapi thing and after the dot is the name of the key in the collection file
        formData.append('files.image', file);

        await axios.post('http://localhost:1337/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.jwt}`
            }
        }).then(response => {
            console.log(response)
        }).catch(err => {
            if (err.response) {
                console.log('err.response', err.response);
                setError(err.response.data.message)
            } else {
                console.log(err);
            }
        })



    }

    return (
        <div>
            <h2>Create</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Description'
                    value={description}
                    onChange={(e) => {
                        setError('')
                        setDescription(e.target.value)
                    }} />

                <input type="file"
                    placeholder='Add a File'
                    onChange={(e) => {
                        setFile(e.target.files[0])
                        setError('')
                    }} />;
                <button type='submit'> Submit </button>
            </form>
        </div>
    )
}
