# React Components

This document explains React components, how they are used, and common component patterns.

## What is a Component?

A React component is a reusable piece of UI. Components can be composed together to build complex interfaces.

## Types of Components

- **Function components**
  - Most common in modern React.
  - Defined as JavaScript functions that return JSX.
  - Can use hooks like `useState`, `useEffect`, and custom hooks.

- **Class components**
  - Older React pattern using ES6 classes.
  - Includes lifecycle methods such as `componentDidMount` and `componentDidUpdate`.
  - Less common in new projects but still supported.

## Example Function Component

```jsx
import React from 'react';

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
```

## Component Props

Props are inputs passed from parent components to child components.

- They are read-only inside the child component.
- Use props to make components reusable and configurable.

Example:

```jsx
<Greeting name="Jenny" />
```

## Component State

State stores local data inside a component.

- Only function or class components can own state.
- Updates to state trigger a re-render.

Example with hooks:

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

## Component Composition

Components often contain other components. This makes UI modular and easier to maintain.

Example:

```jsx
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
```

## Common Component Patterns

- **Presentational components**
  - Focus on markup and styling.
  - Receive data via props.

- **Container components**
  - Handle state and logic.
  - Pass data to presentational components.

- **Reusable UI components**
  - Buttons, form fields, cards, and layout elements.

- **Page components**
  - Used by router systems to render complete pages.

## Best Practices

- Keep components small and focused.
- Name components using PascalCase.
- Extract repeated UI into reusable components.
- Prefer function components and hooks for new development.

## File Naming

- Use `ComponentName.jsx` or `ComponentName.js`.
- Put related styles and tests near the component when the project grows.

## Summary

React components are the building blocks of a React application. Understanding props, state, and composition helps create maintainable and reusable UI code.
