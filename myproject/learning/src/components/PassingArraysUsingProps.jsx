// function PassingArraysUsingProps() {
//   const names = ['Alice', 'Bob', 'Charlie'];
//   const person = { name: 'John', age: 30 };
//     return (
//         <div>
//             <h1>Passing Arrays  using Props</h1>
//             <h2>Names: {names.join(', ')}</h2>
//             <h2>Person: {person.name}, Age: {person.age}</h2>
//         </div>
//     )
// }
function PassingArraysUsingProps({names}) {
return (
    <div>
        <h1>Passing Arrays  using Props</h1>
        <h2>Names: {names.join(', ')}</h2>
    </div>
)
}

export default PassingArraysUsingProps