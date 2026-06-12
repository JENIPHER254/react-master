import Hello from './components/Hello'
import AuthButton from './components/AuthButton'
import DestructuringProps from './components/DestructuringProps'
import OptimumDestructuringProps from './components/OptimumDestructuringProps'
import ImmutabilityOfProps from './components/ImmutabilityOfProps'
import PassingArraysUsingProps from './components/PassingArraysUsingProps'

import PassingObjectsUsingProps from './components/PassingObjectsUsingProps'
import RenderingArrays from './components/RenderingArrays'
import RenderingAnArrayOfObjects from './components/RenderingAnArrayOfObjects'
import RenderingComponents from './components/RenderingComponents'
import ConditionallyRenderingComponents from './components/ConditionallyRenderingComponents'
import ConditionallyRenderingComponentsUsingElementVariables from './components/ConditionalRenderingUsingElementVariables'
import TernaryOperators from './components/TernaryOperators'
import ConditionallyRenderingListItems from './components/ConditionallyRenderingListsItems'
import EventHandling from './components/EventHandling'
import States from './components/States'
import MultipleStates from './components/MultipleStates'
import HandlingUserInput from './components/HandlingUserInput'
import HandlingMultipleInputs from './components/HandlingMultipleInpits'
import { useState } from 'react'

const names = ['Alice', 'Bob', 'Charlie'];

const name = 'Chance';
function App() {
  const [text, setText] = useState('');
  const person = {
    name: 'John', age: 30, city: 'New York'
  };

  // function to reverse text or lists
  // ================================================
  function reverse(text) {
    const reversed = text.split('').reverse().join('');
    setText(reversed)
    console.log(reversed)
    return reversed;
  }
  // ================================================

  // Write a function to remove duplicates from an array.-------------------
  // Using Set
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Using filter
  function removeDuplicatesFilter(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  const grades = [85, 90, 78, 45, 30, 20, 50, 60, 70, 80, 90, 98];
  return (
    <>
      <Hello />
      <h1 onClick={() => reverse('sat')}>Its your beautiful friend  {name}. Im {(10 + 20)} years old </h1>
      <AuthButton label="Login" icon="🔑" />
      <AuthButton label="register" icon="£" />
      <DestructuringProps date="2026" location="New York" />

      <OptimumDestructuringProps date="2026" location="New York" />
      <ImmutabilityOfProps name={name} />
      <PassingArraysUsingProps names={names} />
      <PassingObjectsUsingProps person={person} />
      <RenderingArrays />
      <RenderingAnArrayOfObjects />
      <RenderingComponents />
      <ConditionallyRenderingComponents />
      <ConditionallyRenderingComponentsUsingElementVariables displayMessage={true} isLoggedIn={false} />
      <TernaryOperators displayMessage={true} isLoggedIn={false} />
      <ConditionallyRenderingListItems items={grades} />
      <EventHandling value={10} />
      <States />
      <MultipleStates myname={name} />
      <HandlingUserInput />
      <HandlingMultipleInputs />
    </>
  )
}

export default App
