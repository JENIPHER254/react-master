export default function FruitComponent({ id, name, price}) {
  return (
    <div>
        <li key={id}> {name} - ${price.toFixed(2)}</li>
    
    </div>
  )
}