function Greeting1(props) {
    const { name , message} = props;
    return <p>{message} {name}!</p>;
}
export default Greeting1;