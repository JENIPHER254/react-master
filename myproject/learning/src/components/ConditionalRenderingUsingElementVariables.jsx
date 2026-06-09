export default function ConditionallyRenderingComponentsUsingElementVariables({ displayMessage, isLoggedIn }) {
    let message; // Declare a variable to hold the message. Element  variable allows us to store a html/JSX element in a variable and use it in the render method.

    if (displayMessage) {
        message = isLoggedIn ? <p>Welcome back, user!</p> : <p>Please log in to continue.</p>;
    } else {
        message = <p>The message is hidden.</p>;
    }

    return (
        <div>
            <h1>Conditionally Rendering Components Using Element Variables</h1>
            {message}
        </div>
    );
}
