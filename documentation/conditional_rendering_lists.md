# Conditional Rendering of Lists in React

Conditional rendering for lists is used when you want to display only some list items or show a different list state depending on data.

## Filter before rendering

The simplest pattern is to filter the array before mapping:

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

## Render `null` for skipped items

You can also map all items and return `null` for items that should not render:

```jsx
function TodoList({ todos, showCompleted }) {
  return (
    <ul>
      {todos.map((todo) =>
        showCompleted || !todo.completed ? (
          <li key={todo.id}>{todo.text}</li>
        ) : null
      )}
    </ul>
  );
}
```

## Conditional status message

Show a message when the filtered list is empty:

```jsx
function TodoList({ todos }) {
  const activeTodos = todos.filter((todo) => !todo.completed);

  if (activeTodos.length === 0) {
    return <p>No active items. Add a todo to get started.</p>;
  }

  return (
    <ul>
      {activeTodos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Conditional nested lists

When items contain nested arrays, conditionally render the nested list only when needed:

```jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <section key={category.id}>
          <h2>{category.name}</h2>
          {category.items.length > 0 ? (
            <ul>
              {category.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <p>No items available</p>
          )}
        </section>
      ))}
    </div>
  );
}
```

## Use conditions inside item rendering

Each item can render differently based on its own data:

```jsx
function MessageList({ messages }) {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          {message.isImportant ? <strong>{message.text}</strong> : message.text}
        </li>
      ))}
    </ul>
  );
}
```

## Performance and readability

- Filter arrays once before mapping when possible.
- Avoid complex conditions inside `map`; extract to helper functions or variables.
- Use stable keys for rendered list items.

## Summary

Conditional list rendering in React is about filtering or selecting items before rendering and showing fallback content when no items are available. Keep logic readable and prefer array methods like `filter` and `map` to keep JSX clean.
