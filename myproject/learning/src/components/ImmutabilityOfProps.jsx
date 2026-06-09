
function ImmutabilityOfProps(props) {
    const name = `Hello, ${props.name}!`;
    const age = 30;
    // not allowed to change props.name directly, as props are immutable meaning they cannot be modified after they are passed to a component. Instead, we create a new variable name that combines the greeting with the name prop. This way, we can use the name variable in our component without modifying the original props.
    return (
        <div>
            <h1>Immutability of props </h1>
            <h2>{name} {age + 2}</h2>
           
        </div>

    )
}
export default ImmutabilityOfProps