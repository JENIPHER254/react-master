# Synchronous vs Asynchronous Code

## Synchronous code

Synchronous code runs line by line, in order. Each statement waits for the previous one to complete.

```js
console.log('Start');

function slowFunction() {
  // imagine this takes 5 seconds
  return 'Done';
}

const result = slowFunction();
console.log(result);

console.log('End');
// logs: Start, Done, End (in order, waits for slowFunction)
```

## Blocking code

Synchronous code blocks the execution of following code:

```js
console.log('Start');

const data = veryExpensiveCalculation(); // blocks until complete

console.log(data);
console.log('End');
```

If `veryExpensiveCalculation()` takes a long time, nothing else runs during that time.

## Asynchronous code

Asynchronous code does not block. It starts an operation and lets other code run while waiting for the result.

```js
console.log('Start');

fetch('https://api.example.com/data').then((response) => {
  console.log('Data received');
});

console.log('End');
// logs: Start, End, Data received
// fetch does not block; End runs before the data arrives
```

## Common asynchronous operations

- `fetch()` for HTTP requests
- `setTimeout()` for delayed execution
- `readFile()` for file system operations
- event listeners for DOM events
- database queries

## Callbacks for asynchronous results

Use callbacks to run code when an asynchronous operation completes:

```js
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

console.log('This runs immediately');
// logs: This runs immediately, This runs after 2 seconds
```

## Promises for cleaner async code

Promises provide a cleaner way to handle asynchronous results:

```js
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Async/await for readable async code

Async/await makes asynchronous code look synchronous:

```js
async function loadData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

loadData();
```

## Key differences

| Synchronous | Asynchronous |
|---|---|
| Runs line by line | Can start operations and continue |
| Blocks following code | Does not block |
| Simpler to follow | More complex, but prevents blocking |
| Slow operations freeze the UI | Keeps the UI responsive |

## Summary

- Synchronous code runs in order and blocks execution.
- Asynchronous code starts operations without blocking.
- Use callbacks, promises, or async/await to handle asynchronous results.
- JavaScript uses asynchronous code to keep the UI responsive during long operations.
