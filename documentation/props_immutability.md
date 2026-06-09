# React Props Immutability

In React, `props` are read-only values passed from a parent component to a child component.
A component should never modify its own `props` directly.

## Why props are immutable

- `props` represent external data that the component receives from its parent.
- Allowing children to mutate `props` would break the one-way data flow in React.
- Immutability makes component behavior predictable and easier to debug.

## Example of props usage

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Greeting name="Jenny" />;
}
```

Here, `Greeting` receives `name` through `props`, but it does not change `name`.

## What not to do

```jsx
function Counter({ initialCount }) {
  // Wrong: props should not be reassigned or mutated
  // initialCount = initialCount + 1;
  return <div>Count: {initialCount}</div>;
}
```

This is incorrect because `initialCount` is a prop and belongs to the parent component's data.

## Correct approach with state

If a component needs to change a value over time, use React state instead of mutating props.

```jsx
import { useState } from 'react';

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Immutability and objects

If a prop is an object or array, do not mutate it either. Instead, create new values.

```jsx
function ItemList({ items }) {
  // Wrong: items.push('new item');
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

When updating complex props, handle changes in the parent and pass new objects or arrays down again.

## Summary

Props are immutable in React to preserve the one-way data flow. If a component must change data, use state or ask the parent to provide updated props.
