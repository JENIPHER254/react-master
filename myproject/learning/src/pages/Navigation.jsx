import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

// Navigation component: Renders the main menu bar with links to all pages.
// Shows a logout button if a user is logged in, otherwise shows a login link.
function Navigation() {
    // activeStyle: Applied to NavLink when the link's route matches the current URL.
    // This visually indicates which page the user is currently viewing.
    const activeStyle = {
        textDecoration: 'underline',
        color: '#0070f3',
    }

    // useAuth hook provides access to user info and the logout function.
    const { user, logout } = useAuth()

    // useNavigate hook allows us to programmatically navigate after logout.
    const navigate = useNavigate()

    // handleLogout: Called when the user clicks the logout button.
    // Clears the user session and redirects to the login page.
    function handleLogout() {
        logout() // Clear user and token from AuthContext.
        navigate('/login') // Redirect to login page.
    }

    return (
        <nav style={{ marginBottom: '1.5rem' }}>
            {/* NavLink to the Home page. 'end' ensures it only highlights on exact match (/) */}
            <NavLink to="/" end style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Home
            </NavLink>
            {' | '}

            {/* NavLink to the About page. */}
            <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                About
            </NavLink>
            {' | '}

            {/* NavLink to the Products page. */}
            <NavLink to="/products" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Products
            </NavLink>
            {' | '}

            {/* NavLink to the Blog page (displays all blog posts). */}
            <NavLink to="/blog" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Blog
            </NavLink>
            {' | '}

            {/* NavLink to the Add Blog page (form to create a new post). */}
            <NavLink to="/blog/add" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Add Blog
            </NavLink>
            {' | '}

            {/* NavLink to the Reset Password page. */}
            <NavLink to="/reset-password" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Reset Password
            </NavLink>
            {' | '}

            {/* Conditional rendering: Show logout button if user is logged in, otherwise show login link. */}
            {user ? (
                // Logout button appears when user is authenticated.
                <button type="button" onClick={handleLogout} style={{ marginLeft: 8 }}>
                    Logout
                </button>
            ) : (
                // Login link appears when no user is authenticated.
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    Login
                </NavLink>
            )}
        </nav>
    )
}

export default Navigation
