import React, { createContext, useContext, useState } from 'react'

// AuthContext is created to share authentication state across the entire app without prop drilling.
// This allows any component to access user info and login/logout functions.
const AuthContext = createContext(null)

// AuthProvider component wraps the app and provides authentication state to all child components.
// This component should be placed high in the component tree (in main.jsx).
export function AuthProvider({ children }) {
    // user: stores the logged-in user's information (email, name, role, token).
    // Initially null until the user logs in.
    const [user, setUser] = useState(null)

    // token: stores the authentication token returned from the login endpoint.
    // This token can be used to authorize API requests.
    const [token, setToken] = useState('')

    // login function: called when a user successfully logs in.
    // Stores the user data and token in state so they persist across page navigations.
    function login(userData, authToken) {
        setUser(userData)
        setToken(authToken)
    }

    // logout function: called to clear the user session.
    // Sets user to null and clears the token.
    function logout() {
        setUser(null)
        setToken('')
    }

    // AuthContext.Provider wraps all children and makes the auth state available via useAuth hook.
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// useAuth custom hook allows components to access auth state and functions.
// Must be called inside components that are wrapped by AuthProvider.
export function useAuth() {
    return useContext(AuthContext)
}
