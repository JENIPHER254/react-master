# JSX Syntax Guide

## What JSX Is
JSX stands for JavaScript XML. It is a syntax extension for JavaScript used in React to describe what the UI should look like.

JSX looks like HTML, but it is actually JavaScript. Under the hood, JSX is transformed into `React.createElement()` calls.

## How JSX Works

- JSX expressions are written inside parentheses or directly in return statements.
- Each JSX tag becomes a JavaScript object representation of a UI element.
- JSX can include JavaScript expressions inside curly braces: `{ }`.

Example:

```jsx
const element = <h1>Hello, world!</h1>;
```

This is transformed into JavaScript like:

```js
const element = React.createElement('h1', null, 'Hello, world!');
```

## JSX Rules

- JSX tags must be closed.
  - Self-closing tags require a slash: `<img src="image.jpg" />`
- JSX elements must have one parent wrapper.
- JavaScript expressions inside JSX use `{}`.
- Attributes use camelCase for properties like `className`, `htmlFor`, `onClick`.

Example with expressions and props:

```jsx
function Greeting(props) {
  return (
    <div className="greeting">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
}
```

## What JSX Means

- `<Component />` means create a React element of that component.
- `className` is used instead of `class` because `class` is a reserved keyword in JavaScript.
- JSX is not required, but it makes UI code easier to read and write.
- When JSX is compiled, it becomes plain JavaScript that React understands.

## Summary

JSX is a way to write declarative UI code using a syntax that looks like HTML inside JavaScript. It represents React elements and allows embedding JavaScript expressions to make UI dynamic.
