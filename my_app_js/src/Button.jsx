function MainButton(props) {
    const buttonStyle ={
    backgroundColor: props.color || 'blue',
    borderRadius: "8px",
    borderStyle: "none",
    boxSizing: "border-box",
    color: "#FFFFFF",
    cursor: "pointer",
    flexShrink: "0",
    fontSize: 12,
    fontWeight: 500,
    height: "2rem",
    padding: "0 1.6rem",
    textAlign: "center",
    textShadow: "rgba(0, 0, 0, 0.25) 0 3px 8px",
    transition: "all .5s",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
   
    }
  return (
    <button style={buttonStyle} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
export default MainButton;