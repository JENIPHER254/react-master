function ArrayPropsRendering({ fruits }) {
  return (
    <div>
      <ol>
        {fruits.map((fruit) => (
          <li>
            {fruit.emoji} {fruit.name} {fruit.price}
          </li>
        ))}
      </ol>
    </div>
  );
}
export default ArrayPropsRendering;
