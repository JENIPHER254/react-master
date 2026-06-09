# React Props

Props (short for "properties") are how React components receive data from their parent components.
They are read-only and should not be modified by the component that receives them.

## Why use props

- Pass data from a parent component to a child component.
- Make components reusable and configurable.
- Keep components stateless when needed.

## Basic usage

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Greeting name="Jenny" />;
}
```

In this example, `App` passes the `name` prop to `Greeting`.

## Destructuring props

You can extract values directly from props using destructuring:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

## Passing multiple props

```jsx
function UserCard({ name, age, isAdmin }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Admin: {isAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
}

function App() {
  return <UserCard name="Jenny" age={28} isAdmin={true} />;
}
```

## Props are read-only

A component should never modify its own props:

```jsx
function Counter({ initialCount }) {
  // Wrong: props should not be changed
  // initialCount = 0;
  return <div>Count: {initialCount}</div>;
}
```

If a component needs to manage changing state, use `useState` or another state mechanism.

## Default props and prop types

You can provide default values for props:

```jsx
function Button({ label = 'Click me' }) {
  return <button>{label}</button>;
}
```

In TypeScript or with prop type checking libraries such as `prop-types`, you can also validate prop shapes.

## Summary

Props are the primary way to pass data and configuration into React components. They enable component reuse, make your UI predictable, and help separate parent logic from child display.
