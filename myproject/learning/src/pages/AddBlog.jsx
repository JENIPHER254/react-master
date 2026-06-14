import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from '../BlogContext'

// AddBlog page: Allows users to create and submit a new blog post.
// After successfully adding a post, the user is redirected to the Blog page.
function AddBlog() {
    // Form state: Stores the title and body of the new blog post.
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    // UI state: message shows success feedback, error shows validation errors.
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    // useBlog hook provides access to the addPost function from BlogContext.
    const { addPost } = useBlog()

    // useNavigate hook allows us to redirect to the blog page after successful submission.
    const navigate = useNavigate()

    // handleSubmit: Called when the form is submitted. Validates and adds the new blog post.
    function handleSubmit(event) {
        // Prevent the browser from reloading the page on form submit.
        event.preventDefault()

        // Clear previous messages.
        setError('')
        setMessage('')

        // Validate that both title and body are provided and not just whitespace.
        if (!title.trim() || !body.trim()) {
            setError('Both title and body are required.')
            return
        }

        // Add the new post to BlogContext. The post is added at the top of the blog list.
        addPost({ title: title.trim(), body: body.trim() })

        // Show success message to the user.
        setMessage('Blog post added successfully.')

        // Clear the form inputs.
        setTitle('')
        setBody('')

        // Wait a short moment for the user to see the success message, then redirect.
        setTimeout(() => {
            navigate('/blog')
        }, 400)
    }

    return (
        <main>
            <h1>Add Blog</h1>
            <p>Create a new blog post and add it to the user blog list.</p>

            {/* Form to collect the blog post title and body. */}
            <form onSubmit={handleSubmit} style={{ maxWidth: 520, display: 'grid', gap: '0.75rem' }}>
                {/* Blog title input. */}
                <label>
                    Blog Title
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </label>

                {/* Blog body textarea (6 rows tall). */}
                <label>
                    Blog Body
                    <textarea
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        rows={6}
                        required
                    />
                </label>

                {/* Submit button to add the blog post. */}
                <button type="submit">Add Blog</button>
            </form>

            {/* Success message shown after adding a post. */}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            {/* Error message shown if validation fails. */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    )
}

export default AddBlog
