# Async/Await in JavaScript

Async/await is modern syntax for working with promises. It makes asynchronous code look and behave more like synchronous code, making it easier to read and understand.

## The `async` keyword

The `async` keyword declares that a function returns a promise:

```js
async function fetchUser(id) {
  // ...
}
```

An async function always returns a promise.

## The `await` keyword

`await` pauses the function until a promise is settled (fulfilled or rejected):

```js
async function fetchUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  const user = await response.json();
  return user;
}
```

## Handling success

The resolved value is returned directly:

```js
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data); // the data object
  return data;
}
```

## Handling errors

Use `try...catch` to handle errors:

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Fetch attempt complete');
  }
}
```

## Awaiting multiple operations

Use `Promise.all()` to await multiple promises:

```js
async function fetchMultiple() {
  try {
    const [users, posts] = await Promise.all([
      fetch('https://api.example.com/users').then((r) => r.json()),
      fetch('https://api.example.com/posts').then((r) => r.json()),
    ]);
    console.log(users, posts);
  } catch (error) {
    console.error(error);
  }
}
```

## Sequential vs parallel

Sequential (waits for each operation):

```js
const user = await fetchUser(1);
const posts = await fetchUserPosts(user.id);
```

Parallel (starts both operations at once):

```js
const [user, posts] = await Promise.all([
  fetchUser(1),
  fetchUserPosts(1),
]);
```

## Rules for `await`

- `await` can only be used inside an `async` function.
- The function pauses at each `await` until the promise settles.
- If the promise rejects, an error is thrown.

## Summary

- `async` declares a function that returns a promise.
- `await` pauses execution until a promise is settled.
- Use `try...catch` to handle errors.
- Async/await is more readable than promise chains.
