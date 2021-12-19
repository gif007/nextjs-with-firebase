import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';


export default function Login() {
    const [ credentials, setCredentials ] = useState({email: '', password: ''});
    const auth = getAuth();
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.email.length < 2 || credentials.password.length < 2) {
            alert('Please enter a valid email and password');
            return;
        }
        const { email, password } = credentials;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            window.location.href="/";
        } catch (err) {
            const { code, message } = err;
            alert(`Code: ${code}\nMessage: ${message}`);
            setCredentials({...credentials, password: ''});
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={credentials.email}
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    value={credentials.password}
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}