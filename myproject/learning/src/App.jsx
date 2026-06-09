import Hello from './components/Hello'
import AuthButton from './components/AuthButton'
import DestructuringProps from './components/DestructuringProps'
import OptimumDestructuringProps from './components/OptimumDestructuringProps'
import ImmutabilityOfProps from './components/ImmutabilityOfProps'

const name = 'Jenny'
function App() {
 
  return (
    <>
    <Hello />
    <h1>Its your beautiful friend  {name}. Im {(10+20)} years old</h1>
    <AuthButton label="Login" icon="🔑" />
    <AuthButton label="register" icon= "£" />
    <DestructuringProps date="2026" location="New York" />
   
    <OptimumDestructuringProps date="2026" location="New York" />
    <ImmutabilityOfProps name={name} />

    </>
  )
}

export default App
