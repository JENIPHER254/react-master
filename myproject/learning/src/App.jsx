import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Blog from './pages/Blog'
import AddBlog from './pages/AddBlog'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'

// Main App component that defines all the routes and page structure.
// This component is rendered inside multiple providers (Router, Auth, Blog) in main.jsx.
// The Routes component from react-router-dom matches the URL to the appropriate page component.

function App() {
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Navigation component renders the site menu bar with NavLinks to all pages. */}
      <Navigation />

      {/* Routes define the URL paths and which component to render for each path. */}
      <Routes>
        {/* Root route (/) renders the Home page. */}
        <Route path="/" element={<Home />} />

        {/* /about route renders the About page. */}
        <Route path="/about" element={<About />} />

        {/* /products route renders the Products page. */}
        <Route path="/products" element={<Products />} />

        {/* /blog route renders the Blog page (displays all blog posts in a table). */}
        <Route path="/blog" element={<Blog />} />

        {/* /blog/add route renders the AddBlog page (form to create a new blog post). */}
        <Route path="/blog/add" element={<AddBlog />} />

        {/* /login route renders the Login page (form to authenticate a user). */}
        <Route path="/login" element={<Login />} />

        {/* /reset-password route renders the ResetPassword page (form to reset account password). */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
