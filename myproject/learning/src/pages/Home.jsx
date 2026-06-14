import React from 'react'
import { useAuth } from '../AuthContext'

// Home page: Main dashboard shown to all users, displays user info when logged in.
// This is the landing page after login (route = '/').
function Home() {
    // useAuth hook retrieves the current user from AuthContext.
    // user is null if no one is logged in, or an object if someone is logged in.
    const { user } = useAuth()

    return (
        <main>
            <h1>Home Page</h1>

            {/* Conditional rendering: Show user info if logged in, otherwise show login prompt. */}
            {user ? (
                // User info section: Displayed when a user is logged in.
                // Shows user's name, email, role, and token in a styled box.
                <section style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
                    {/* Personalized welcome message using the user's name. */}
                    <h2>Welcome back, {user.name}!</h2>

                    {/* Display user's email address. */}
                    <p>Logged in as <strong>{user.email}</strong>.</p>

                    {/* Display user's role (currently set to 'Learner'). */}
                    <p>Role: {user.role}</p>

                    {/* Display authentication token. Can be used for API requests. */}
                    <p>Token: <code>{user.token}</code></p>
                </section>
            ) : (
                // Message shown when no user is logged in.
                <p>Please log in to see your user information.</p>
            )}

            {/* Description of the home page. Always shown. */}
            <p>Welcome to the learner project home page. This is the main dashboard after login.</p>
        </main>
    )
}

export default Home
