# Handling Form Submission in React

React handles form submission using event handlers and controlled components. A typical approach is to prevent the browser's default behavior and process the form data in JavaScript.

## Basic form submit example

```jsx
import { useState } from 'react';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted:', { email, message });
    // Send data to an API or update state
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
```

## Prevent default submit behavior

By default, submitting a form reloads the page. Use `event.preventDefault()` to stop that behavior:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  // process form values
}
```

## Accessing form data

With controlled inputs, the component state already contains the values:

```jsx
const [name, setName] = useState('');
const [password, setPassword] = useState('');
```

For uncontrolled forms, you can use refs, but controlled inputs are usually preferred in React.

## Multiple input fields and a single handler

```jsx
function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Signup data:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

## Handling submit success and errors

Update state to reflect submission status:

```jsx
const [status, setStatus] = useState('idle');

async function handleSubmit(event) {
  event.preventDefault();
  setStatus('submitting');
  try {
    await sendFormData(form);
    setStatus('success');
  } catch (error) {
    setStatus('error');
  }
}
```

## Disabling the submit button

Disable the button while the form is being submitted:

```jsx
<button type="submit" disabled={status === 'submitting'}>
  {status === 'submitting' ? 'Sending...' : 'Send'}
</button>
```

## Summary

- Use `onSubmit` on the `<form>` element.
- Call `event.preventDefault()` to avoid full page reloads.
- Use controlled components for input values.
- Store submit state if you need loading, success, or error handling.
- Keep form data updates predictable with React state.
