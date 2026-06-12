# JavaScript Closures

A closure is a function that remembers the variables from the place where it was created, even after that outer function has finished running.

## How closures work

When a function is defined inside another function, the inner function can access variables from the outer function.

```js
function outer() {
  const message = 'Hello from outer';

  function inner() {
    console.log(message);
  }

  return inner;
}

const savedInner = outer();
savedInner(); // logs: Hello from outer
```

In this example:

- `outer()` defines a variable `message`.
- `inner()` uses `message` even though `outer()` has finished executing.
- The returned function `savedInner` keeps access to `message`.

## Why closures are useful

Closures let you:

- keep data private
- create functions with preserved state
- build factories and helpers that remember values
- implement callback functions with access to context

## Example: private state

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

The `count` variable remains available to the inner function even after `createCounter()` returns.

## Nested functions and closures

A closure works whenever a function is defined inside another function:

```js
function greet(name) {
  const greeting = 'Hello';

  function sayHello() {
    console.log(`${greeting}, ${name}!`);
  }

  return sayHello;
}

const greetJenny = greet('Jenny');
greetJenny(); // Hello, Jenny!
```

Here, `sayHello` closes over both `greeting` and `name`.

## Summary

- A closure is created when an inner function retains access to variables from its outer function.
- Closures allow inner functions to use and preserve data from their surrounding scope.
- They are a powerful tool for creating private state and reusable function patterns.
