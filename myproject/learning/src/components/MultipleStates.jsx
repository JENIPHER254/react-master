import {useState} from 'react';
export default function MultipleStates() {
    const [count, setCount] = useState(0);
    const [incrementBy, setIncrementBy] = useState(4);
    const [name, setName] = useState('Jenny');
    function increment() {
        setCount(count + incrementBy);
    }
    function changeName() {
        setName('Alice');
    }  
    function changeIncrementBy() {
        setIncrementBy(incrementBy + 1);
    } 
    return (
        <div>
            <h1>Multiple States in React</h1>   
            <p>Count value is: {count}</p>
            <p>Incrementing the value by: {incrementBy}</p>
            <button onClick={increment}>Increment</button>
            <br />
            <p>Name value is: {name}</p>
            <button onClick={changeName}>Change Name</button>
            <button onClick={changeIncrementBy}>Change Increment By</button>
        </div>
    );
}