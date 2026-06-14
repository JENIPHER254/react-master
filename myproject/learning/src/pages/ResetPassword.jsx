import React, { useState } from 'react'

// ResetPassword page: Allows users to reset their account password.
// This is a simulated workflow. In a real app, this would call an API endpoint.
function ResetPassword() {
    // Form state: Stores email and password inputs from the user.
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // UI state: message shows success feedback, error shows validation errors.
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    // handleSubmit: Called when the form is submitted. Validates and processes the password reset.
    async function handleSubmit(event) {
        // Prevent the browser from reloading the page on form submit.
        event.preventDefault()

        // Clear previous messages.
        setError('')
        setMessage('')

        // Validate that all fields are provided.
        if (!email || !newPassword || !confirmPassword) {
            setError('Please fill out all fields.')
            return
        }

        // Validate that the new password and confirm password match.
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        try {
            // This is a simulated password reset workflow (just waits 500ms).
            // In a real application, you would call an API endpoint here like:
            // const response = await fetch('/api/reset-password', {
            //   method: 'POST',
            //   body: JSON.stringify({ email, newPassword }),
            // })
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Show success message.
            setMessage('Password reset requested successfully. Check your email for next steps.')

            // Clear the form inputs.
            setEmail('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err) {
            // Display error message if something goes wrong.
            setError('Password reset failed. Please try again later.')
        }
    }

    return (
        <main>
            <h1>Reset Password</h1>
            <p>Enter the email address used for your account and choose a new password.</p>

            {/* Form to collect email and new password. */}
            <form onSubmit={handleSubmit} style={{ maxWidth: 420, display: 'grid', gap: '0.75rem' }}>
                {/* Email input. */}
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>

                {/* New password input. */}
                <label>
                    New Password
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                    />
                </label>

                {/* Confirm password input (must match the new password above). */}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </label>

                {/* Submit button to process the password reset. */}
                <button type="submit">Reset Password</button>
            </form>

            {/* Success message shown after submitting the form. */}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            {/* Error message shown if validation fails. */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    )
}

export default ResetPassword
