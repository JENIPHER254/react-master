import Hello from './components/Hello'
import AuthButton from './components/AuthButton'

const name = 'Jenny'
function App() {
 
  return (
    <>
    <Hello />
    <h1>Its your beautiful friend  {name}. Im {(10+20)} years old</h1>
    <AuthButton label="Login" icon="🔑" />
    <AuthButton label="register" icon= "£" />

    </>
  )
}

export default App
