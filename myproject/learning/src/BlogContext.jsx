import React, { createContext, useContext, useEffect, useState } from 'react'

// BlogContext is created to share blog state (posts, loading, error) across the app.
// All blog operations (fetch, create, update, delete) are now performed via API endpoints.
const BlogContext = createContext(null)

// Base API URL for all blog endpoints. Can be overridden via environment variable.
const BASE_API_URL = import.meta.env.VITE_BLOG_API_URL || 'https://jsonplaceholder.typicode.com'

// BlogProvider component wraps the app and provides blog state to all child components.
export function BlogProvider({ children }) {
    // posts: array of blog post objects fetched from the API.
    // Each post has id, title, body, and author properties.
    const [posts, setPosts] = useState([])

    // loading: boolean flag indicating if an API request is in progress.
    // Used to show loading messages while data is being retrieved or modified.
    const [loading, setLoading] = useState(false)

    // error: string that stores any error message if an API request fails.
    // Displayed to the user if something goes wrong.
    const [error, setError] = useState('')

    // useEffect hook runs once when the component mounts (dependency array is empty).
    // It fetches blog posts from the API.
    useEffect(() => {
        fetchPosts()
    }, [])

    // fetchPosts: Fetches all blog posts from the API endpoint.
    async function fetchPosts() {
        try {
            setLoading(true)
            setError('')

            // Call the fetch blog posts endpoint.
            // Default endpoint: https://jsonplaceholder.typicode.com/posts?_limit=6
            // Can be overridden with VITE_BLOG_API_URL environment variable.
            const response = await fetch(`${BASE_API_URL}/posts?_limit=6`)

            if (!response.ok) {
                throw new Error('Could not load blog posts')
            }

            const data = await response.json()

            // Transform the API response into the expected format.
            setPosts(
                data.map((post) => ({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    author: `User ${post.userId || 'Unknown'}`,
                })),
            )
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // addPost: Creates a new blog post via POST endpoint.
    // Takes newPost object with { title, body } properties.
    // Returns the created post object or null if failed.
    async function addPost(newPost) {
        try {
            setLoading(true)
            setError('')

            // POST request to create a new blog post.
            // Endpoint: {BASE_API_URL}/posts
            // Body: { title, body, userId: 1 }
            const response = await fetch(`${BASE_API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newPost.title,
                    body: newPost.body,
                    userId: 1, // Default user ID for created posts.
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create blog post')
            }

            const createdPost = await response.json()

            // Add the newly created post to the top of the posts list.
            setPosts((currentPosts) => [
                {
                    id: createdPost.id,
                    title: createdPost.title,
                    body: createdPost.body,
                    author: 'Current User',
                },
                ...currentPosts,
            ])

            return createdPost
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    // updatePost: Updates an existing blog post via PUT endpoint.
    // Takes postId and updates object with { title, body } properties.
    // Returns the updated post object or null if failed.
    async function updatePost(postId, updates) {
        try {
            setLoading(true)
            setError('')

            // PUT request to update a blog post.
            // Endpoint: {BASE_API_URL}/posts/{postId}
            // Body: { title, body, userId: 1 }
            const response = await fetch(`${BASE_API_URL}/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updates.title,
                    body: updates.body,
                    userId: 1,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update blog post')
            }

            const updatedPost = await response.json()

            // Update the post in the posts list.
            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post.id === postId ? { ...post, ...updates } : post
                ),
            )

            return updatedPost
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    // deletePost: Deletes a blog post via DELETE endpoint.
    // Takes postId to identify which post to delete.
    // Returns true if successful, false if failed.
    async function deletePost(postId) {
        try {
            setLoading(true)
            setError('')

            // DELETE request to remove a blog post.
            // Endpoint: {BASE_API_URL}/posts/{postId}
            const response = await fetch(`${BASE_API_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete blog post')
            }

            // Remove the post from the posts list.
            setPosts((currentPosts) =>
                currentPosts.filter((post) => post.id !== postId)
            )

            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    // getPost: Fetches a single blog post via GET endpoint.
    // Takes postId to identify which post to fetch.
    // Returns the post object or null if not found.
    async function getPost(postId) {
        try {
            setLoading(true)
            setError('')

            // GET request to fetch a single blog post.
            // Endpoint: {BASE_API_URL}/posts/{postId}
            const response = await fetch(`${BASE_API_URL}/posts/${postId}`)

            if (!response.ok) {
                throw new Error('Could not load blog post')
            }

            const post = await response.json()

            return {
                id: post.id,
                title: post.title,
                body: post.body,
                author: `User ${post.userId || 'Unknown'}`,
            }
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    // BlogContext.Provider makes all blog state and functions available to child components.
    return (
        <BlogContext.Provider value={{ posts, loading, error, fetchPosts, addPost, updatePost, deletePost, getPost }}>
            {children}
        </BlogContext.Provider>
    )
}

// useBlog custom hook allows components to access blog state and functions.
// Must be called inside components that are wrapped by BlogProvider.
export function useBlog() {
    return useContext(BlogContext)
}

    

// deletePost function: removes a blog post from the posts array by ID.
function deletePost(postId) {
    setPosts((currentPosts) =>
        // Filter out the post with the matching ID.
        currentPosts.filter((post) => post.id !== postId)
    )
}

// BlogContext.Provider makes all blog state and functions available to child components.
return (
    <BlogContext.Provider value={{ posts, loading, error, addPost, updatePost, deletePost }}>
        {children}
    </BlogContext.Provider>
)


// useBlog custom hook allows components to access blog state and functions.
// Must be called inside components that are wrapped by BlogProvider.
export function useBlog() {
    return useContext(BlogContext)
}
