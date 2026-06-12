# The Event Loop in JavaScript

The event loop is how JavaScript handles asynchronous operations while being single-threaded. It manages the order in which code runs and when asynchronous callbacks are executed.

## How JavaScript is single-threaded

JavaScript can only run one piece of code at a time. Despite this limitation, JavaScript can handle many asynchronous operations (like fetching data, timers, etc.) because of the event loop.

## The call stack

The call stack is where JavaScript tracks which function is currently running.

```js
function a() {
  b();
}

function b() {
  console.log('b');
}

a(); // b is added to the stack, runs, then is removed
```

## The task queue (callback queue)

When asynchronous operations complete, their callbacks are placed in the task queue.

```js
console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 1000);

console.log('end');
// logs: start, end, timeout
```

## The event loop

The event loop constantly checks: if the call stack is empty, move callbacks from the task queue to the call stack.

1. Execute synchronous code (call stack runs).
2. When all synchronous code finishes, check the task queue.
3. If the task queue has callbacks, move them to the call stack one by one.
4. Repeat.

## Microtask queue

Promises and async operations use a special microtask queue that runs before the regular task queue.

```js
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// logs: 1, 4, 3, 2
```

The order is:
1. Synchronous code: 1, 4
2. Microtask queue (promises): 3
3. Task queue (setTimeout): 2

## Summary

- JavaScript is single-threaded but can handle async operations using the event loop.
- The event loop moves callbacks from the task queue to the call stack when the stack is empty.
- Microtasks (promises) run before regular tasks (setTimeout, events).
- Understanding the event loop helps explain why code runs in unexpected order.
