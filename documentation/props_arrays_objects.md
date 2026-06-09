# Passing Arrays and Objects as Props in React

You can pass arrays and objects as props to React components just like any other value. Because props are immutable, components should not mutate arrays or objects received via props — instead, create new copies when you need to update data.

## Passing arrays

Parent:

```jsx
const colors = ['red', 'green', 'blue'];

function App() {
  return <Palette colors={colors} />;
}
```

Child (read-only):

```jsx
function Palette({ colors }) {
  return (
    <ul>
      {colors.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}
```

Do not mutate `colors` in `Palette` (e.g., no `colors.push(...)`). To update the list, update it in the parent and pass a new array.

Example updating in parent:

```jsx
function App() {
  const [colors, setColors] = useState(['red', 'green', 'blue']);

  function addColor(newColor) {
    setColors((prev) => [...prev, newColor]);
  }

  return <Palette colors={colors} onAdd={addColor} />;
}
```

Child calls the handler instead of mutating props:

```jsx
function Palette({ colors, onAdd }) {
  return (
    <div>
      <ul>
        {colors.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <button onClick={() => onAdd('purple')}>Add Purple</button>
    </div>
  );
}
```

## Passing objects

Parent:

```jsx
const user = { id: 1, name: 'Jenny', roles: ['admin'] };

function App() {
  return <UserCard user={user} />;
}
```

Child should treat `user` as read-only. If you need a local copy or need to derive state, create state from the prop:

```jsx
function UserCard({ user }) {
  const [localUser, setLocalUser] = useState(user);
  // localUser can now be updated locally without mutating the prop
}
```

When updating objects in the parent, prefer immutable updates:

```jsx
function updateUserName(prevUser, newName) {
  return { ...prevUser, name: newName };
}

setUser((prev) => updateUserName(prev, 'New Name'));
```

## Keys and lists

When rendering arrays, always provide a stable `key` prop to list items. Avoid using array index as key when items can reorder or change.

## PropTypes / TypeScript

For runtime validation, use `prop-types`:

```jsx
Palette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func,
};
```

Or use TypeScript interfaces for stronger type safety.

## Summary

- You may pass arrays and objects as props.
- Never mutate props in the child component; update data in the parent.
- Use handlers (`onAdd`, `onUpdate`) to request changes from children.
- Use immutable patterns (`...spread`, `Array.prototype.map`) to produce new arrays/objects.
