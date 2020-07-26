import React, { useState, useContext, useEffect } from 'react';

import axios from 'axios'

import { UserContext } from '../context/UserContext'


export default function Login({ history }) {


    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user])

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post('http://localhost:1337/auth/local', {
            identifier: email,
            password: password
        }).then(response => {
            setUser(response.data);
        }).catch(err => {
            //To catch errors objects with AXIOS you must access err.response
            console.log(err.response)
            setError(err.response.data.message[0].messages[0].message)
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                        setError('')
                    }}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                        setError('');
                    }} />

                <button type='submit'>Login</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}
