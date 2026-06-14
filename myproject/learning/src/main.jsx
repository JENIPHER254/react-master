import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './AuthContext'
import { BlogProvider } from './BlogContext'

// The application entry point that sets up all necessary providers and renders the root component.
// This file is executed in the browser and mounts the React app to the DOM.

// Provider hierarchy (from outer to inner):
// - StrictMode: Highlights potential problems in the app during development
// - BrowserRouter: Enables client-side routing using the HTML5 History API
// - AuthProvider: Provides authentication state to all components (user info and login/logout)
// - BlogProvider: Provides blog state to all components (posts, CRUD operations)
// - App: The main application component with all the pages and navigation

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <App />
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

