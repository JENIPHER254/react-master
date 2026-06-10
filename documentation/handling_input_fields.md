# Handling Input Fields in React

React uses controlled components for most form inputs. A controlled input is one where React state drives the input's value and updates happen through event handlers.

## Single input field

```jsx
import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <label>
        Name:
        <input value={name} onChange={handleChange} />
      </label>
      <p>Your name: {name}</p>
    </div>
  );
}
```

## Multiple input fields

Use a single state object to manage multiple fields, or use separate state values for each input.

### Option 1: Separate state values

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    </form>
  );
}
```

### Option 2: One state object for multiple fields

```jsx
function SignUpForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  return (
    <form>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
    </form>
  );
}
```

## Controlled vs uncontrolled inputs

- Controlled inputs: use React state to set `value` and `onChange`.
- Uncontrolled inputs: use `defaultValue` and refs. Controlled inputs are preferred for most React forms.

## Handling form submit

```jsx
function ContactForm() {
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submit:', email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
```

## Checkbox and radio inputs

Checkbox:

```jsx
function Subscribe() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={subscribed}
        onChange={(e) => setSubscribed(e.target.checked)}
      />
      Subscribe
    </label>
  );
}
```

Radio group:

```jsx
function PaymentMethod() {
  const [method, setMethod] = useState('card');

  return (
    <div>
      <label>
        <input
          type="radio"
          value="card"
          checked={method === 'card'}
          onChange={(e) => setMethod(e.target.value)}
        />
        Card
      </label>
      <label>
        <input
          type="radio"
          value="paypal"
          checked={method === 'paypal'}
          onChange={(e) => setMethod(e.target.value)}
        />
        PayPal
      </label>
    </div>
  );
}
```

## Textareas and select fields

Textarea:

```jsx
function CommentBox() {
  const [comment, setComment] = useState('');
  return <textarea value={comment} onChange={(e) => setComment(e.target.value)} />;
}
```

Select:

```jsx
function FruitPicker() {
  const [fruit, setFruit] = useState('apple');
  return (
    <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </select>
  );
}
```

## Best practices

- Keep input state in React for controlled components.
- Use `name` attributes when managing multiple fields with one handler.
- Keep handlers small and reusable.
- Avoid direct state mutations; always update state immutably.

## Summary

Handling input fields in React is usually done with controlled components and `useState`. For multiple inputs, either store separate state values or use a single state object with `name`-based updates.
