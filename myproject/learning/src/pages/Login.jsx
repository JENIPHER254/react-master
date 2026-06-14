import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

// Login page component: Handles user authentication and stores the login token and user info.
// When login succeeds, the user is redirected to the home page (/).
function Login() {
    // Form state: Stores email and password inputs from the user.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // UI state: error tracks login failure messages, loading indicates a login request is in progress.
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // useNavigate hook allows us to redirect the user after successful login.
    const navigate = useNavigate()

    // useAuth hook gives us access to the login function from AuthContext.
    const { login } = useAuth()

    // API_URL is the endpoint where login credentials are sent.
    // It can be overridden using the VITE_LOGIN_ENDPOINT environment variable.
    // Default is https://reqres.in/api/login (a free test API).
    const API_URL = import.meta.env.VITE_LOGIN_ENDPOINT || 'https://reqres.in/api/login'

    // handleSubmit: Called when the form is submitted. Sends login credentials to the API.
    async function handleSubmit(event) {
        // Prevent the browser from reloading the page on form submit.
        event.preventDefault()

        // Set loading state and clear any previous error messages.
        setLoading(true)
        setError('')

        try {
            // Send a POST request to the login API with email and password.
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            // Parse the response JSON (contains token and error messages).
            const data = await response.json()

            // If the response was not successful (4xx or 5xx status), throw an error.
            if (!response.ok) {
                throw new Error(data.error || 'Login failed')
            }

            // Login succeeded: Store user info and token in AuthContext.
            // Extract the user's name from the email (text before the @ symbol).
            login({
                email,
                name: email.split('@')[0] || 'Learner',
                role: 'Learner',
                token: data.token,
            }, data.token)

            // Redirect the user to the home page after successful login.
            navigate('/')
        } catch (err) {
            // If an error occurs, store the error message to display to the user.
            setError(err.message)
        } finally {
            // Always set loading to false when done (success or error).
            setLoading(false)
        }
    }

    return (
        <main>
            <h1>Login Page</h1>
            <p>Enter your credentials to login and be redirected to Home.</p>

            {/* Login form: email and password inputs with a submit button. */}
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'grid', gap: '0.75rem' }}>
                {/* Email input field. */}
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </label>

                {/* Password input field. */}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="password"
                        required
                    />
                </label>

                {/* Submit button: Disabled while a login request is in progress. */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {/* Display error message if login failed. */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {/* Link to the password reset page. */}
            <p>
                Forgot your password? <Link to="/reset-password">Reset it here</Link>.
            </p>

            {/* Helper text explaining environment variable configuration. */}
            <p>
                Note: Replace <code>VITE_LOGIN_ENDPOINT</code> in <code>.env</code> or use the default endpoint.
            </p>
        </main>
    )
}

export default Login
