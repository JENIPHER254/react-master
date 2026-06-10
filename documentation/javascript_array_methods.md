# JavaScript Array Methods in React

React components often use JavaScript array methods to read, update, and render lists. The most common methods are `.filter()`, `.map()`, and `.length`.

## `.filter()`

`.filter()` creates a new array with items that match a condition.

```jsx
const completed = Todos.filter((todo) => todo.completed);
```

- It does not modify the original array.
- It returns a new array that can be used for rendering or updating state.

### Example: remove an item by id

```jsx
const updatedTodos = Todos.filter((todo) => todo.id !== id);
setMyTodos(updatedTodos);
```

### Example: count completed items

```jsx
const completedCount = Todos.filter((todo) => todo.completed).length;
```

## `.map()`

`.map()` transforms each item in an array and returns a new array.

```jsx
const titles = Todos.map((todo) => todo.title);
```

### Example: toggle completed state

```jsx
const newTodos = Todos.map((todo) =>
  todo.id === id ? { ...todo, completed: !todo.completed } : todo
);
setMyTodos(newTodos);
```

- Use `.map()` when you need to update or render every item.
- Always return a new object when changing item properties.

## `.length`

Use `.length` to count array items:

```jsx
const total = Todos.length;
```

Combine `.filter()` and `.length` for derived counts:

```jsx
const incompleteCount = Todos.filter((todo) => !todo.completed).length;
```

## Immutability and React state

React state should be updated immutably:

- Do not modify arrays in place.
- Use `.filter()` and `.map()` to create new arrays.
- Use object spread (`{ ...todo }`) to update objects inside arrays.

### Wrong:

```jsx
Todos.push(newTodo);
```

### Correct:

```jsx
setMyTodos([...Todos, newTodo]);
```

## Rendering lists in JSX

When rendering arrays, use `.map()` and a `key` for each item:

```jsx
<tbody>
  {Todos.map((todo) => (
    <tr key={todo.id}>
      <td>{todo.title}</td>
    </tr>
  ))}
</tbody>
```

## Summary

`.filter()` selects items.
`.map()` transforms items.
`.length` counts items.
Use these methods together to derive values, update state immutably, and render lists cleanly in React.
