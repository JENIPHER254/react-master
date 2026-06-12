# Promises in JavaScript

A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

## Promise states

A promise can be in one of three states:

- `pending` - the operation is still running
- `fulfilled` - the operation completed successfully
- `rejected` - the operation failed

```js
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve('Operation successful');
  } else {
    reject('Operation failed');
  }
});
```

## `.then()` for fulfillment

Use `.then()` to handle a fulfilled promise:

```js
promise.then((result) => {
  console.log(result);
});
```

## `.catch()` for rejection

Use `.catch()` to handle a rejected promise:

```js
promise.catch((error) => {
  console.error(error);
});
```

## Chaining promises

Promises can be chained:

```js
fetch('https://api.example.com/users')
  .then((response) => response.json())
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.error(error);
  });
```

## `.finally()`

`.finally()` runs regardless of whether the promise fulfilled or rejected:

```js
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => {
    console.log('operation complete');
  });
```

## Promise.all()

Run multiple promises in parallel and wait for all to complete:

```js
Promise.all([
  fetch('/users'),
  fetch('/posts'),
  fetch('/comments'),
])
  .then((responses) => {
    console.log('all fetches complete');
  })
  .catch((error) => {
    console.error('at least one fetch failed');
  });
```

## Promise.race()

Return the result of the first promise that completes:

```js
Promise.race([promise1, promise2]).then((firstResult) => {
  console.log(firstResult);
});
```

## Summary

- A promise represents an asynchronous operation with eventual completion.
- Use `.then()` for success and `.catch()` for errors.
- Chain promises to run operations in sequence.
- Use `Promise.all()` to wait for multiple promises.
