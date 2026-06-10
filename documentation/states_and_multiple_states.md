# State and Multiple States in React

State is data managed within a component that can change over time. When state changes, React re-renders the component to reflect the new state.

## What is state

State is information that a component can modify. Unlike props, which are passed from parent to child and are read-only, state is owned and controlled by the component itself.

## Using `useState` hook

The `useState` hook lets you add state to functional components:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

`useState` returns an array with two elements:
1. The current state value (`count`).
2. A function to update the state (`setCount`).

## Initial state

You can set an initial value by passing it to `useState`:

```jsx
const [name, setName] = useState('Jenny');
const [items, setItems] = useState([]);
const [user, setUser] = useState(null);
```

## Multiple states

A component can use multiple `useState` calls to manage different pieces of state:

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  function handleSubmit() {
    console.log({ name, email, age });
  }

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

## Managing related state together

When state values are related, consider grouping them in an object:

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Jenny',
    email: 'jenny@example.com',
    age: 28,
  });

  function updateUser(field, value) {
    setUser((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
      />
      <input
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
      />
    </div>
  );
}
```

## Updating state immutably

State should be updated immutably (without directly mutating the state). Use new objects or arrays:

```jsx
// Wrong: mutating state directly
// user.name = 'John';
// setUser(user);

// Correct: creating a new object
setUser((prev) => ({ ...prev, name: 'John' }));
```

For arrays:

```jsx
// Add item
setItems((prev) => [...prev, newItem]);

// Remove item by id
setItems((prev) => prev.filter((item) => item.id !== idToRemove));

// Update item
setItems((prev) =>
  prev.map((item) =>
    item.id === idToUpdate ? { ...item, name: newName } : item
  )
);
```

## State updates are asynchronous

State updates are batched and asynchronous. The state value won't change immediately after calling the setter:

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // Still logs 0, not 1
}
```

To run code after state updates, use `useEffect`.

## When to use multiple vs. grouped state

- **Multiple states**: When values are independent of each other.
- **Grouped state**: When values are logically related and update together.

## Rules for state

- Only call `useState` at the top level of a component, not inside loops or conditionals.
- Use state for data that changes and affects the UI.
- Avoid storing derived values in state; compute them instead.

## Summary

State is how React components manage data that changes. Use `useState` for single values or multiple `useState` calls for independent values. When values are related, group them in an object. Always update state immutably to ensure React detects changes properly.
