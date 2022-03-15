import App from './App';
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react'
import LoginButton from './LoginButton';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

async function loginUser(credentials) {
    console.log(credentials)
    return fetch('http://localhost:3000/pokemon', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        },
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div>
            <form>
                <div onSubmit={handleSubmit} class="form-group">
                    <label for="exampleInputUsername1">Enter Username</label>
                    <input onChange={e => setUsername(e.target.value)} type="text" class="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Enter username" />
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}