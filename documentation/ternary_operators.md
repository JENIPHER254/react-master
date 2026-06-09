# Ternary Operators in React

Ternary operators are a compact way to choose between two values in JSX. They are often used for conditional rendering and inline value substitution.

## Basic syntax

```jsx
condition ? valueIfTrue : valueIfFalse
```

## Example in JSX

```jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? 'Welcome back!' : 'Please sign in.'}</h1>;
}
```

## Conditional component rendering

```jsx
function Status({ status }) {
  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <p>Finished loading.</p>
      )}
    </div>
  );
}
```

## Using ternary operators for props

```jsx
function Button({ isPrimary }) {
  return (
    <button className={isPrimary ? 'btn-primary' : 'btn-secondary'}>
      Click me
    </button>
  );
}
```

## Avoiding nested ternaries

Nested ternary expressions can be hard to read. Prefer helper functions or element variables when there are more than two cases.

```jsx
function Message({ state }) {
  if (state === 'loading') return <p>Loading...</p>;
  if (state === 'success') return <p>Success!</p>;
  return <p>Something went wrong.</p>;
}
```

## Readability tips

- Use ternaries for simple, two-way conditions.
- Keep the expressions short.
- When the JSX branch is large, wrap it in parentheses for clarity.
- If the condition becomes complex, move it into a variable.

## Summary

Ternary operators are useful for inline conditional logic in React. They are best for simple, readable conditions and should be avoided when they become deeply nested or too complex.
