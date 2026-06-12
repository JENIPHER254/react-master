# Callbacks in JavaScript

A callback is a function that is passed as an argument to another function and is executed later (often after some asynchronous operation completes).

## Passing functions as arguments

In JavaScript, functions are values that can be passed around:

```js
function greet(name, callback) {
  console.log('Hello, ' + name);
  callback();
}

function goodbye() {
  console.log('Goodbye!');
}

greet('Jenny', goodbye);
// logs: Hello, Jenny
// logs: Goodbye!
```

Here, `goodbye` is a callback function passed to `greet`.

## Callbacks with arguments

Callbacks can receive data from the function that calls them:

```js
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'Jenny' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

## Array methods with callbacks

Many array methods accept callbacks:

```js
const numbers = [1, 2, 3];

numbers.forEach((num) => {
  console.log(num);
});

const doubled = numbers.map((num) => num * 2);

const evens = numbers.filter((num) => num % 2 === 0);
```

## Event listeners with callbacks

DOM events use callbacks:

```js
const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

## Callback hell (pyramid of doom)

Nesting many callbacks makes code hard to read:

```js
// Callback hell
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      getMoreData(c, function (d) {
        console.log(d);
      });
    });
  });
});
```

This is why promises and async/await are preferred for complex async flows.

## Summary

- A callback is a function passed as an argument to another function.
- Callbacks are useful for handling asynchronous operations.
- Too many nested callbacks make code difficult to read.
- Promises and async/await are modern alternatives to callbacks.
