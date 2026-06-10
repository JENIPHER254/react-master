# Consuming API Endpoints in React

React apps often need to fetch data from external APIs and display it in the UI. This guide shows how to consume multiple endpoints, handle loading and error state, and render the results.

## Use `useEffect` for fetching data

Use the `useEffect` hook to run API calls when the component mounts.

```jsx
import { useEffect, useState } from 'react';

useEffect(() => {
  // fetch data here
}, []);
```

The empty dependency array `[]` means the effect runs once after the first render.

## Fetching multiple endpoints

Use `Promise.all()` to fetch several endpoints in parallel:

```jsx
const [usersResponse, postsResponse] = await Promise.all([
  fetch('https://jsonplaceholder.typicode.com/users'),
  fetch('https://jsonplaceholder.typicode.com/posts'),
]);
```

Then read the JSON from both responses:

```jsx
const [users, posts] = await Promise.all([
  usersResponse.json(),
  postsResponse.json(),
]);
```

## Loading and error state

Manage state for loading and error feedback:

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

Update state while fetching:

```jsx
setLoading(true);
setError(null);
```

Handle fetch failures:

```jsx
if (!response.ok) {
  throw new Error('Unable to load API data.');
}
```

## Displaying API data

Render the fetched arrays in JSX using `.map()`:

```jsx
{users.map((user) => (
  <li key={user.id}>{user.name}</li>
))}
```

And for posts:

```jsx
{posts.map((post) => (
  <div key={post.id}>{post.title}</div>
))}
```

## HTTP methods and headers

The `fetch()` function can send different HTTP methods. By default, `fetch(url)` sends a `GET` request. To use `POST`, `PUT`, or `DELETE`, provide a second options object.

### GET request example

```jsx
const response = await fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
});
const users = await response.json();
```

### POST request example

```jsx
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    title: 'Hello',
    body: 'This is a new post.',
    userId: 1,
  }),
});
const newPost = await response.json();
```

## Checking the request and response

You can capture both the request options and the response details to display them in the UI.

```jsx
const requestInfo = {
  method: 'POST',
  url: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  body: payload,
};

const response = await fetch(requestInfo.url, {
  method: requestInfo.method,
  headers: requestInfo.headers,
  body: JSON.stringify(requestInfo.body),
});

const responseData = await response.json();

if (!response.ok) {
  throw new Error('Request failed');
}
```

Then render the request and response objects for debugging:

```jsx
<pre>{JSON.stringify(requestInfo, null, 2)}</pre>
<pre>{JSON.stringify(responseData, null, 2)}</pre>
```

## Example component behavior

A component can show:

- A loading message while a GET request loads data.
- Request details for the GET call.
- A form that sends a POST request.
- The POST request body and headers.
- The response data returned by the POST request.
- An error message if either request fails.

## Best practices

- Keep API calls inside `useEffect` for initial loads.
- Use explicit `method` and `headers` for POST/PUT requests.
- Use `JSON.stringify()` for JSON request bodies.
- Check `response.ok` and `response.status` before reading JSON.
- Display request and response details when debugging or teaching API usage.
- Use unique `key` props when rendering lists.

## Summary

Consuming APIs in React means fetching data in effects, managing loading/error state, and rendering the request/response details. Use `GET` for loading existing data and `POST` for sending data to the server, including headers and a JSON body when required.
