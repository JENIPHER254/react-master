# React `useEffect` Hook

The `useEffect` hook runs side effects in functional components. Side effects are operations that affect something outside the component, such as fetching data, updating the DOM, subscribing to events, or syncing derived values.

## Importing `useEffect`

```jsx
import { useEffect } from 'react';
```

## Basic use

`useEffect` accepts a function and an optional dependency array:

```jsx
useEffect(() => {
  // effect code here
}, [dependencies]);
```

## Dependency array

The dependency array tells React when the effect should rerun.

- `[]` means run once after the component mounts.
- `[someValue]` means run when `someValue` changes.
- Omit the array to run the effect after every render.

## Example

```jsx
useEffect(() => {
  console.log('Todos changed', Todos);
}, [Todos]);
```

In a todo app, `useEffect` is useful for updating derived state when the todo list changes:

```jsx
useEffect(() => {
  setCompleteTasks(Todos.filter((todo) => todo.completed).length);
  setIncompleteTasks(Todos.filter((todo) => !todo.completed).length);
}, [Todos]);
```

## Effect cleanup

If your effect sets up a subscription, timer, or event listener, return a cleanup function:

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => {
    clearInterval(timerId);
  };
}, []);
```

## Common use cases

- Fetching data on mount
- Updating the document title
- Syncing derived state from props or other state
- Subscribing and unsubscribing to events

## Best practices

- Always include dependencies that are used inside the effect.
- Keep effect logic focused and avoid doing too much inside one effect.
- Avoid calling hooks conditionally.
- Do not put state setters in the dependency array unless the setter itself is computed.

## Notes

- `useEffect` runs after the render completes.
- State updates inside an effect will trigger another render if the state changes.
- Derived values usually do not need their own state unless they are expensive to compute or must persist across renders.
