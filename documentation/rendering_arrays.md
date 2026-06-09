# Rendering Arrays / Lists in React

Rendering arrays (lists) is common in React. Use JavaScript array methods (typically `map`) to return JSX for each item.

## Basic example

```jsx
function FruitList({ fruits }) {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  );
}

// Usage
// const fruits = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }];
// <FruitList fruits={fruits} />
```

## The `key` prop

- Always provide a `key` prop for each list item.
- Keys should be unique and stable across renders (e.g., a database `id`).
- Avoid using array indices as keys when items can be reordered, inserted, or removed.

Bad:

```jsx
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
```

Good:

```jsx
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
```

## Keys and component identity

React uses keys to identify elements between renders. Changing keys forces unmount/mount which may lose local state.

## Rendering fragments

If you need to return multiple elements for each item without adding extra DOM nodes, use fragments:

```jsx
{items.map((item) => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </React.Fragment>
))}
```

Or shorthand:

```jsx
{items.map((item) => (
  <>
    <dt key={`${item.id}-term`}>{item.term}</dt>
    <dd key={`${item.id}-def`}>{item.definition}</dd>
  </>
))}
```

(Note: when using the shorthand `<>` you cannot pass a `key` to the fragment.)

## Conditional rendering within lists

Filter or map with conditions before rendering, or render `null` to skip:

```jsx
{items
  .filter((i) => i.visible)
  .map((i) => <Item key={i.id} item={i} />)}

// or
{items.map((i) => (i.visible ? <Item key={i.id} item={i} /> : null))}
```

## Nested lists

Render nested arrays by mapping inside each parent item:

```jsx
{posts.map((post) => (
  <article key={post.id}>
    <h3>{post.title}</h3>
    <ul>
      {post.comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  </article>
))}
```

## Performance tips

- Provide stable keys to minimize unnecessary re-renders.
- Avoid creating new objects/arrays inline as much as practical; memoize heavy computations with `useMemo`.
- If rendering a very large list, consider virtualization libraries (e.g., `react-window`, `react-virtualized`).

## Example with add/remove

```jsx
import { useState } from 'react';

function TodoApp({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  function addTodo(text) {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('New task')}>Add</button>
    </div>
  );
}
```

## PropTypes / TypeScript

Validate list props with `prop-types` or TypeScript types:

```jsx
MyList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, name: PropTypes.string })
  ).isRequired,
};
```


## Summary

- Use `map` to render arrays.
- Always provide unique, stable `key` props.
- Avoid mutating lists while rendering; update state in parent or via handlers.
- For large lists, use virtualization to improve performance.
