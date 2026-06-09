# Rendering an Array of Objects in React

Rendering arrays of objects in React is a common pattern. Use `map` to transform each object into JSX and provide a stable `key` prop for each rendered element.

## Basic example

```jsx
function ProductList({ products }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <strong>{p.name}</strong> — ${p.price}
        </li>
      ))}
    </ul>
  );
}

// Usage
// const products = [{ id: 1, name: 'Shoes', price: 59.99 }, { id: 2, name: 'Hat', price: 19.99 }];
// <ProductList products={products} />
```

## Why `key` matters

- `key` helps React identify which items changed between renders.
- Use a unique, stable identifier (e.g., `id`).
- Avoid using array indices as keys when items can be added, removed, or reordered.

## Rendering complex item markup

If each item needs multiple elements, either return a component per item or use fragments:

```jsx
function ProductItem({ product }) {
  return (
    <li>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <span>${product.price}</span>
    </li>
  );
}

// In list:
{products.map((p) => (
  <ProductItem key={p.id} product={p} />
))}
```

Or with fragments for non-list containers:

```jsx
{products.map((p) => (
  <React.Fragment key={p.id}>
    <dt>{p.name}</dt>
    <dd>{p.description}</dd>
  </React.Fragment>
))}
```

## Conditional rendering and filtering

Filter the array before mapping to render only the items you want:

```jsx
{products
  .filter((p) => p.inStock)
  .map((p) => <ProductItem key={p.id} product={p} />)}
```

Or return `null` inside `map` to skip items.

## Nested lists

For nested arrays (e.g., product variants), map again inside the parent item and provide keys at every level:

```jsx
{products.map((p) => (
  <article key={p.id}>
    <h3>{p.name}</h3>
    <ul>
      {p.variants.map((v) => (
        <li key={v.sku}>{v.label}</li>
      ))}
    </ul>
  </article>
))}
```

## Updating arrays immutably

When you need to add, remove, or update items, produce a new array and set state in the parent:

```jsx
setProducts((prev) => [...prev, newProduct]);
setProducts((prev) => prev.filter((p) => p.id !== idToRemove));
setProducts((prev) => prev.map((p) => (p.id === id ? {...p, price: newPrice} : p)));
```

Do not mutate the array in-place (no `push`, `splice`, or direct property assignment on props).

## Performance considerations

- Use stable keys to avoid unnecessary mounts/unmounts.
- Avoid recreating large arrays inline on every render; memoize or lift state when appropriate.
- For very large lists, consider virtualization (`react-window`, `react-virtualized`).

## PropTypes / TypeScript

Validate shapes to catch mistakes early:

```jsx
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
```

Or in TypeScript:

```ts
type Product = { id: number; name: string; price: number; description?: string };
function ProductList({ products }: { products: Product[] }) { /* ... */ }
```

## Common pitfalls

- Using array index as `key` when list order can change.
- Mutating the array/objects passed as props inside child components.
- Forgetting keys for nested lists.

## Summary

- Use `map` to render arrays of objects.
- Provide unique, stable `key` props.
- Keep updates immutable and performed by state setters in the owner component.
- Use components for complex item rendering and consider virtualization for big lists.
