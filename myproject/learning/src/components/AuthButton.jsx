function AuthButton(props) {
  return (
    <button style={{ padding: '10px', backgroundColor: 'brown', color: 'white', border: 'none', cursor: 'pointer' ,  borderRadius: '5px',margin:'10px'}}>
      {props.label} {props.icon}
    </button>
  )
}   
export default AuthButton