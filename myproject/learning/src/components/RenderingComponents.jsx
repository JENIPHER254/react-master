import FruitComponent from './FruitComponent'
const fruits =[
    { id: 1, name: 'Apple' , price: 1.5,stats:[{fresh:false,ripe:true}]},
    { id: 2, name: 'Banana' , price: 0.8,stats:[{fresh:true,ripe:true}]},
    { id: 3, name: 'Cherry' , price: 2.0,stats:[{fresh:'yes',ripe:'no'}]},
]
export default function RenderingComponents() {

  return (
    <div>
      <h1>Rendering Components</h1>
      <ul>
        {fruits.map((fruit) => (
          
            <FruitComponent key={fruit.id} name={fruit.name} price={fruit.price} />
         
        ))}
      </ul>
    </div>
  )
}