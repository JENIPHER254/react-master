function DestructuringProps(props) {
  const { date, location } = props;
  return (
    <div>
      <h1>Destructuring Props on {date} in {location}</h1>
    </div>
  )
}
export default DestructuringProps