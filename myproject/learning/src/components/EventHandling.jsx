

export default function EventHandling({ value }) {
    const handleClick = () => {
        value += 1;    
        console.log('Button clicked! Current value:', value);
        // alert('Button clicked!')   
    };
    return (
        <div>
            <h1>Event Handling in React</h1>
            
            <button  onClick={handleClick}>Click Me</button>
        </div>
    );
}