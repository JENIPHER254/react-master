export default function ConditionalComponent({ displayMessage, isLoggedIn }) {
    if (displayMessage) {
        return (
            <div>
                <h1>Conditionally Rendering Components</h1>
                {isLoggedIn ? (
                    <p>Welcome back, user!</p>
                ) : (
                    <p>Please log in to continue.</p>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <h1>Conditionally Rendering Components</h1>
                <p>The message is hidden.</p>
            </div>
        )
    }
}
