export default function TernaryOperators({ displayMessage, isLoggedIn }) {
    return (
        <div>
            <h1>Using Ternary Operators for Conditional Rendering</h1>
            {displayMessage ? (
                isLoggedIn ? (
                    <p>Welcome back, user!</p>
                ) : (
                    <p>Please log in to continue.</p>   
                )
            ) : (
                <p>The message is hidden.</p>
            )}
        </div>
    );
}