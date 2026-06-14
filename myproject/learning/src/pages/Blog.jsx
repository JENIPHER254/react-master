import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from '../BlogContext'

// Blog page: Displays all blog posts in a table with options to view, edit, and delete.
// Clicking "View" opens a modal to display the full post.
// Clicking "Edit" opens the same modal in edit mode where users can change title and body.
// Clicking "Delete" removes the post immediately from the list.
function Blog() {
    // useNavigate hook allows us to navigate to the add blog page.
    const navigate = useNavigate()

    // useBlog hook provides access to blog state and CRUD functions from BlogContext.
    // posts: array of blog post objects.
    // loading: boolean indicating if posts are being fetched.
    // error: error message if fetching fails.
    // updatePost, deletePost: functions to modify blog posts.
    const { posts, loading, error, updatePost, deletePost } = useBlog()

    // selectedPost: stores the blog post currently open in the modal (null if modal is closed).
    const [selectedPost, setSelectedPost] = useState(null)

    // editMode: boolean flag indicating if the modal is in edit mode (true) or view mode (false).
    const [editMode, setEditMode] = useState(false)

    // Form state for editing: stores the edited title and body while the modal is open.
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')

    // UI feedback: Shows success messages after edit or delete operations.
    const [message, setMessage] = useState('')

    // useEffect: Clears the edit form inputs whenever the modal is closed (selectedPost becomes null).
    // This ensures the form is fresh when a new post is selected.
    useEffect(() => {
        if (!selectedPost) {
            setEditTitle('')
            setEditBody('')
            setEditMode(false)
        }
    }, [selectedPost])

    // handleView: Opens the modal in view-only mode to display a blog post.
    function handleView(post) {
        setSelectedPost(post)
        setEditMode(false) // Modal will show read-only content.
    }

    // handleEdit: Opens the modal in edit mode with the post data pre-filled in the form.
    function handleEdit(post) {
        setSelectedPost(post)
        setEditMode(true) // Modal will show editable form.
        setEditTitle(post.title)
        setEditBody(post.body)
    }

    // handleDelete: Removes a blog post by ID via DELETE endpoint and shows feedback.
    // This is now an async function to handle the API call.
    async function handleDelete(postId) {
        const success = await deletePost(postId)
        if (success) {
            setMessage('Blog post deleted successfully.')
        } else {
            setMessage('Failed to delete blog post. Please try again.')
        }
    }

    // handleModalSubmit: Called when the edit form is submitted.
    // Updates the blog post with new title and body via PUT endpoint, then closes the modal.
    // This is now an async function to handle the API call.
    async function handleModalSubmit(event) {
        event.preventDefault() // Prevent page reload.
        if (!selectedPost) {
            return
        }

        // Update the post via the API endpoint with the edited values.
        const result = await updatePost(selectedPost.id, {
            title: editTitle,
            body: editBody,
        })

        // Show success or error message to the user based on the result.
        if (result) {
            setMessage('Blog post updated successfully.')
        } else {
            setMessage('Failed to update blog post. Please try again.')
        }

        // Close the modal.
        setSelectedPost(null)
    }

    // closeModal: Closes the modal without saving changes.
    function closeModal() {
        setSelectedPost(null)
        setEditMode(false)
    }

    return (
        <main>
            <h1>Blog Page</h1>
            <p>Read the latest posts and manage blog records with view, edit, and delete actions.</p>

            {/* Button to navigate to the "Add Blog" page (AddBlog component). */}
            <button type="button" onClick={() => navigate('/blog/add')} style={{ marginBottom: '1rem' }}>
                Add New Blog
            </button>

            {/* Loading message while blog posts are being fetched from the API. */}
            {loading && <p>Loading blog posts...</p>}

            {/* Error message if fetching blog posts fails. */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Success message after editing or deleting a post. */}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            {/* Blog posts table: Only displayed when not loading and there are posts to show. */}
            {!loading && posts.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    {/* Table header with column names. */}
                    <thead>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Title</th>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Author</th>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Preview</th>
                            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
                        </tr>
                    </thead>

                    {/* Table body: Map over posts array to render a row for each post. */}
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                {/* Post title column. */}
                                <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem' }}>{post.title}</td>

                                {/* Post author column. */}
                                <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem' }}>{post.author}</td>

                                {/* Post preview: Show first 100 characters of the body, then "…" if longer. */}
                                <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem' }}>
                                    {post.body.slice(0, 100)}{post.body.length > 100 ? '…' : ''}
                                </td>

                                {/* Action buttons: View, Edit, Delete. */}
                                <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem' }}>
                                    {/* View button: Opens modal in view mode. */}
                                    <button type="button" onClick={() => handleView(post)} style={{ marginRight: '0.5rem' }}>
                                        View
                                    </button>

                                    {/* Edit button: Opens modal in edit mode. */}
                                    <button type="button" onClick={() => handleEdit(post)} style={{ marginRight: '0.5rem' }}>
                                        Edit
                                    </button>

                                    {/* Delete button: Removes the post from the blog. */}
                                    <button type="button" onClick={() => handleDelete(post.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal popup: Only rendered when selectedPost is not null (a post is open). */}
            {selectedPost && (
                <div
                    role="dialog"
                    aria-modal="true"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent backdrop.
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                    }}
                >
                    {/* Modal content box. */}
                    <div style={{ background: '#fff', borderRadius: 8, padding: '1.5rem', width: '100%', maxWidth: 680, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.16)' }}>
                        {/* Modal header with title and close button. */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            {/* Modal title changes based on mode. */}
                            <h2>{editMode ? 'Edit Blog Post' : 'View Blog Post'}</h2>

                            {/* Close button: Closes the modal without saving changes. */}
                            <button type="button" onClick={closeModal}>
                                Close
                            </button>
                        </div>

                        {/* Conditional rendering: Show edit form in edit mode, read-only content in view mode. */}
                        {editMode ? (
                            /* Edit form: Allows users to change the title and body of the post. */
                            <form onSubmit={handleModalSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
                                {/* Title input field. */}
                                <label>
                                    Title
                                    <input type="text" value={editTitle} onChange={(event) => setEditTitle(event.target.value)} required />
                                </label>

                                {/* Body textarea field (8 rows tall). */}
                                <label>
                                    Body
                                    <textarea rows={8} value={editBody} onChange={(event) => setEditBody(event.target.value)} required />
                                </label>

                                {/* Submit button: Saves changes and closes the modal. */}
                                <button type="submit">Save Changes</button>
                            </form>
                        ) : (
                            /* View mode: Displays the post content as read-only text. */
                            <article>
                                {/* Display author information. */}
                                <p>
                                    <strong>Author:</strong> {selectedPost.author}
                                </p>

                                {/* Display post title. */}
                                <h3>{selectedPost.title}</h3>

                                {/* Display full post body. */}
                                <p>{selectedPost.body}</p>
                            </article>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}

export default Blog
