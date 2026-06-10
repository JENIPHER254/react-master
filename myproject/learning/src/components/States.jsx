import  { useState } from 'react';
export default function States(){
    // since props cannot change/are immutable, we can use state to manage data that can change over time. State allows us to create dynamic and interactive components that can respond to user input and other events.Props are parameters while states are variables
    const [count, setCount] = useState(0);
    //     const [count, setCount] = useState(() => {
    //     const savedCount = localStorage.getItem('count');
    //     return savedCount ? Number(savedCount) : 0;
    //   }); ===========this is example of local storage with useState, it initializes the count state with a value from local storage if it exists, or defaults to 0 if it doesn't. This allows the count value to persist across page reloads.
    function increment(){
        setCount(count + 1);
    }
    return(
        <div>
            <h1>States in React</h1>
            <p>Count value is: {count}</p>
            <button onClick={increment}>Increment</button>
            <br />
            <br />
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}