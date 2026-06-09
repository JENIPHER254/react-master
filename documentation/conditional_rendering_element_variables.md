# Conditional Rendering with Element Variables in React

Using element variables is a useful pattern for conditional rendering when you want to avoid multiple `return` statements inside a component.
An element variable is that which holds the html or jsx code and can be renderd

## Why use element variables

- Keeps the component body cleaner.
- Centralizes conditional logic before returning JSX.
- Avoids repeating return statements for similar layouts.

## Basic pattern

```jsx
function Greeting({ isLoggedIn }) {
  let message;

  if (isLoggedIn) {
    message = <h1>Welcome back!</h1>;
  } else {
    message = <h1>Please sign in.</h1>;
  }

  return <div>{message}</div>;
}
```

## With multiple conditional branches

```jsx
function StatusMessage({ status }) {
  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'success') {
    content = <p>Success!</p>;
  } else if (status === 'error') {
    content = <p>Error occurred.</p>;
  } else {
    content = <p>Idle</p>;
  }

  return <div>{content}</div>;
}
```

## Using variables for component selection

```jsx
function Page({ pageType }) {
  let pageElement;

  if (pageType === 'home') {
    pageElement = <HomePage />;
  } else if (pageType === 'about') {
    pageElement = <AboutPage />;
  } else {
    pageElement = <NotFoundPage />;
  }

  return (
    <main>
      <Header />
      {pageElement}
      <Footer />
    </main>
  );
}
```

## Keeping layout outside conditionals

This pattern is helpful when the surrounding layout stays the same but only one part changes:

```jsx
function Content({ view }) {
  let viewElement;

  switch (view) {
    case 'list':
      viewElement = <ListView />;
      break;
    case 'grid':
      viewElement = <GridView />;
      break;
    default:
      viewElement = <EmptyView />;
  }

  return (
    <div className="content-wrapper">
      <Toolbar />
      {viewElement}
    </div>
  );
}
```

## Conditional class names and props

Element variables can also be used with components when props or classes vary.

```jsx
function Alert({ type, message }) {
  let alertElement;

  if (type === 'error') {
    alertElement = <div className="alert error">{message}</div>;
  } else {
    alertElement = <div className="alert info">{message}</div>;
  }

  return <div>{alertElement}</div>;
}
```

## Summary

Element variables are a clean way to manage conditional rendering without many `return` statements. Compute the right JSX value first, then return a single JSX tree that includes the chosen element.
