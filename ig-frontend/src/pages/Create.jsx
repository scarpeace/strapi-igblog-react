import React, { useState } from 'react'
import axios from 'axios'


export default function Create() {
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        //To send multipart data to Strapi we need to have a field name DATA
        formData.set('data', JSON.stringify(description));

        //Files is a Strapi thing and after the dot is the name of the key in the collection file
        formData.append('files.image', file);

        await axios.post('http://localhost:1337/posts', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            console.log(response);
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <h2>Create</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Description'
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }} />
                <input type="file" placeholder='Add a File' onChange={(e) => setFile(e.target.files[0])} />
                <button type='submit'> Submit </button>
            </form>
        </div>
    )
}
