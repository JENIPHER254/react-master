# Event Handling in React

React uses a synthetic event system that behaves consistently across different browsers. Event handlers are passed as props to components and usually start with `on`.

## Common event categories

### Mouse events

- `onClick` — triggered when the element is clicked.
- `onDoubleClick` — triggered on a double-click.
- `onMouseEnter` / `onMouseLeave` — triggered when the mouse enters or leaves an element.
- `onMouseMove` — triggered when the mouse moves over an element.

Example:

```jsx
function ClickableButton({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}
```

### Keyboard events

- `onKeyDown` — triggered when a key is pressed down.
- `onKeyUp` — triggered when a key is released.
- `onKeyPress` — triggered when a key is pressed and released (deprecated in modern React).

Example:

```jsx
function TextInput() {
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      console.log('Enter pressed');
    }
  }

  return <input onKeyDown={handleKeyDown} />;
}
```

### Form events

- `onChange` — triggered when the value of a form element changes.
- `onSubmit` — triggered when a form is submitted.
- `onFocus` / `onBlur` — triggered when an element gains or loses focus.

Example:

```jsx
function NameForm() {
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted:', name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Focus events

- `onFocus` — triggered when an element receives focus.
- `onBlur` — triggered when an element loses focus.

These are often used for form validation or accessibility.

### Touch events

- `onTouchStart` — triggered when touch contact is made.
- `onTouchMove` — triggered when touch contact moves.
- `onTouchEnd` — triggered when touch contact ends.

Useful for mobile and touch-enabled interfaces.

### Clipboard events

- `onCopy` — triggered when content is copied.
- `onCut` — triggered when content is cut.
- `onPaste` — triggered when content is pasted.

### Drag events

- `onDragStart` — when dragging starts.
- `onDragOver` — when a dragged item is over a target.
- `onDrop` — when a dragged item is dropped.

## Event handler rules

- Use camelCase names in JSX (`onClick`, not `onclick`).
- Pass a function reference, not a function call: `onClick={handleClick}`.
- Prevent default browser behavior with `event.preventDefault()` when needed.
- Stop propagation with `event.stopPropagation()` if you want to prevent parent events.

## Accessing event data

Event handlers receive a synthetic event object. Use properties like `event.target.value`, `event.key`, and `event.clientX`.

```jsx
function InputLogger() {
  function handleChange(event) {
    console.log('Value:', event.target.value);
  }

  return <input onChange={handleChange} />;
}
```

## Performance tips

- Avoid defining event handlers inline when it causes unnecessary re-renders.
- Use `useCallback` if passing handlers to memoized child components.
- Prefer event delegation through parent components for many similar elements when appropriate.

## Summary

React event handling is similar to normal DOM events but uses a cross-browser synthetic event system. Know the common event types and keep handlers simple and declarative.
