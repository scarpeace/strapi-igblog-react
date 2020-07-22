import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import { UserContext } from '../context/UserContext'

export default function Signup({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext)

    //Check if we have a user in context then redirects user (Initial Value = null)
    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user])

    /* The object template for sending the user is 'username, email, password'. Username being the identifier */
    function handleRegister(e) {
        e.preventDefault();
        axios.post('http://localhost:1337/auth/local/register', {
            username: email,
            email,
            password
        }).then(response => {
            setUser(response.data);
            history.push('/')
            console.log(response)
        }).catch(err => {
            console.log(err.response)
            setError(err.response.data.message[0].messages[0].message);
        })
    }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleRegister}>
                <input type="email"
                    value={email}
                    placeholder='email'
                    onChange={e => {
                        setEmail(e.target.value)
                        setError('')
                    }}
                />
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                        setError('')
                    }}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}
