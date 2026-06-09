const name = 'Comrades'
function Waaw() {
    return (
        <>
        Waaw {name} !
        </>
        
    )
}
function Hello() {
    return (
        <>
        <p>Hello {Waaw()} </p></>
        
    )
}
export default Hello