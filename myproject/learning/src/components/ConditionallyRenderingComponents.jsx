import ConditionalComponent from './ConditionalComponent'
export default function ConditionallyRenderingComponents() {
   return (
    <>
    <ConditionalComponent displayMessage={true} isLoggedIn={true} />
    <ConditionalComponent displayMessage={true} isLoggedIn={false} />
    <ConditionalComponent displayMessage={false} isLoggedIn={true} />
    </>
   )
}