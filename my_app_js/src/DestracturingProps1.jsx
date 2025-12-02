function Greeting1(props) {
    const { name , message, emoji} = props;
    return <p>{message} {name}! {emoji}</p>;//use win + . to access emojis
}
export default Greeting1;