export default function FruitComponent({ key, name, price}) {
  return (
    <div>
        <li key={key}> {name} - ${price.toFixed(2)}</li>
    
    </div>
  )
}