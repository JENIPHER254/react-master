# Rendering Conditional Components in React

Conditional rendering lets React components decide what to render based on state, props, or any expression.

## Basic conditional rendering

Use JavaScript conditions directly inside JSX:

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
    </div>
  );
}
```

## Rendering nothing

Return `null` to render nothing when a condition is false:

```jsx
function Warning({ show }) {
  if (!show) {
    return null;
  }

  return <div className="warning">Warning: action required.</div>;
}
```

## Logical AND (`&&`) rendering

The `&&` operator is useful for rendering an element only when a condition is true:

```jsx
function Notification({ message }) {
  return <div>{message && <p>{message}</p>}</div>;
}
```

## Conditional child components

Choose which child component to render based on props or state:

```jsx
function Page({ pageType }) {
  return (
    <div>
      {pageType === 'home' && <HomePage />}
      {pageType === 'about' && <AboutPage />}
      {pageType === 'contact' && <ContactPage />}
    </div>
  );
}
```

Or use a switch-style helper:

```jsx
function renderPage(pageType) {
  switch (pageType) {
    case 'home':
      return <HomePage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
}

function Page({ pageType }) {
  return <div>{renderPage(pageType)}</div>;
}
```

## Conditional rendering with components and props

Sometimes a component renders one of several child components based on props:

```jsx
function Button({ type, onClick }) {
  if (type === 'primary') {
    return <button className="primary" onClick={onClick}>Save</button>;
  }
  return <button className="secondary" onClick={onClick}>Cancel</button>;
}
```

## Conditional lists

Filter or map items conditionally when rendering lists:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos
        .filter((todo) => !todo.completed)
        .map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
    </ul>
  );
}
```

Or render only visible items:

```jsx
{todos.map((todo) =>
  todo.visible ? <TodoItem key={todo.id} todo={todo} /> : null
)}
```

## Conditional rendering and performance

- Keep conditions simple and easy to read.
- Avoid heavy computations directly inside JSX; move them to a helper or memoized value.
- For many conditional branches, use helper functions or separate components.

## Summary

Conditional rendering is a core React pattern. Use ternaries, logical operators, `null` returns, and helper functions to render the right component for the current state or props. Keep conditions readable and prefer clear component boundaries.
