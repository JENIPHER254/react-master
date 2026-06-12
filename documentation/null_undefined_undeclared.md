# `null`, `undefined`, and `undeclared` in JavaScript

JavaScript has three distinct concepts that represent the absence of a value: `null`, `undefined`, and `undeclared`.

## `undefined`

`undefined` means a variable exists but has not been assigned a value.

```js
let x;
console.log(x); // undefined
```

Other examples of `undefined`:

- function parameters that were not passed
- missing array elements
- object properties that do not exist
- a function that returns nothing

```js
function sayHello(name) {
  console.log(name);
}
sayHello(); // undefined
```

## `null`

`null` is an explicit assignment that means "no value" or "empty".

```js
let y = null;
console.log(y); // null
```

Use `null` when you want to intentionally clear a variable or represent an empty value.

```js
let user = { name: 'Jenny' };
user = null; // user intentionally has no object now
```

## `undeclared`

`undeclared` means a variable has never been defined in the current scope.

```js
console.log(z); // ReferenceError: z is not defined
```

A variable is undeclared when it has not been declared with `let`, `const`, or `var`.

## Common differences

- `undefined` is a value automatically assigned by JavaScript when a variable exists but has no value.
- `null` is a value that you assign intentionally.
- `undeclared` is not a value at all; it means the variable does not exist in the scope.

## Comparing values

```js
let a;
let b = null;

console.log(a === undefined); // true
console.log(b === null); // true
console.log(a == b); // true because loose equality converts both to the same type
console.log(a === b); // false because strict equality checks type too
```

## Best practices

- Use `undefined` for uninitialized variables and optional values.
- Use `null` when you want to represent an intentionally empty value.
- Avoid using undeclared variables; always declare with `let`, `const`, or `var`.

## Summary

- `undefined`: value exists but is not assigned.
- `null`: explicitly assigned to mean empty or no value.
- `undeclared`: the variable does not exist in scope and causes a `ReferenceError` when accessed.
