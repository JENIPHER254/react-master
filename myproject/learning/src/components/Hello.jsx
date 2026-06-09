const name = 'Comrades'
function Waaw() {
    return (
        <p>Waaw {name} !</p>
    )
}
function Hello() {
    return (
        <p>Hello {Waaw()} </p>
    )
}
export default Hello