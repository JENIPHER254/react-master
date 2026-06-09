# Rendering Parent and Child Components in React

React apps are built from components that can render other components. This parent/child pattern helps structure UI in a reusable way.

## Parent and child relationship

A parent component passes data and callbacks to a child component through props. The child receives those props and renders itself accordingly.

```jsx
function Child({ user }) {
  return <div>Hello, {user.name}!</div>;
}

function Parent() {
  const user = { name: 'Jenny' };

  return (
    <div>
      <h1>Welcome</h1>
      <Child user={user} />
    </div>
  );
}
```

## Passing props from parent to child

Props are the main way to configure child components from a parent.

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  return <Button label="Save" onClick={() => alert('Saved!')} />;
}
```

## Child component rendering another child

Components can nest multiple levels.

```jsx
function Avatar({ user }) {
  return <img src={user.avatarUrl} alt={user.name} />;
}

function UserCard({ user }) {
  return (
    <div>
      <Avatar user={user} />
      <h2>{user.name}</h2>
    </div>
  );
}

function App() {
  const user = { name: 'Jenny', avatarUrl: '/avatar.png' };
  return <UserCard user={user} />;
}
```

## Handling events and callbacks

If a child needs to trigger changes, the parent can pass callback props.

```jsx
function Toggle({ isOn, onToggle }) {
  return <button onClick={onToggle}>{isOn ? 'On' : 'Off'}</button>;
}

function App() {
  const [isOn, setIsOn] = useState(false);
  return <Toggle isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />;
}
```

## Rendering lists of child components

Parents often render multiple child components from arrays.

```jsx
function Item({ item }) {
  return <li>{item}</li>;
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </ul>
  );
}
```

## Best practices

- Keep components small and focused.
- Use props for data and callbacks.
- Prefer composition over deep inheritance.
- Pass only the data child components need.
- Keep state in the highest component that owns it.

## Summary

Parent components render child components by returning them in JSX. Props let the parent configure the child, and callbacks let the child communicate upward. This makes UI easy to build, reuse, and maintain.
