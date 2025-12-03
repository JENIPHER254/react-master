import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import MainButton from "./Button.jsx";
import Greeting1 from "./DestracturingProps1.jsx";
import Greeting2 from "./DestructuringProps2.jsx";
import ArrayPropsRendering from "./ArrayPropsRendering.jsx";

const fruits = [
  { name: "Apple", emoji: "🍎", price: "$1" },
  { name: "Banana", emoji: "🍌", price: "$0.5" },
  { name: "Cherry", emoji: "🍒", price: "$2" },
  { name: "Grapes", emoji: "🍇", price: "$3" },
  { name: "Mango", emoji: "🥭", price: "$1.5" },
  { name: "Pineapple", emoji: "🍍", price: "$2.5" },
  { name: "Strawberry", emoji: "🍓", price: "$2" },
  { name: "Watermelon", emoji: "🍉", price: "$4" },
  { name: "Peach", emoji: "🍑", price: "$1.8" },
  { name: "Kiwi", emoji: "🥝", price: "$2.2" },
  { name: "Orange", emoji: "🍊", price: "$1.2" },
  { name: "Papaya", emoji: "🍈", price: "$3.5" },
  { name: "Lemon", emoji: "🍋", price: "$0.8" },
  { name: "Coconut", emoji: "🥥", price: "$2.8" },
  { name: "Avocado", emoji: "🥑", price: "$2.3" },
  { name: "Blueberry", emoji: "🫐", price: "$3.2" },
  { name: "Raspberry", emoji: "🍇", price: "$3.1" },
  { name: "Blackberry", emoji: "🍇", price: "$3.3" },
  { name: "Cranberry", emoji: "🍒", price: "$3.4" },
  { name: "Fig", emoji: "🍈", price: "$2.9" },
];
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App name="Jenipher" message="Hey there ! " />
    <MainButton label="Testing" onclick="#" color="red" />
    {/* testing */}
    <App name="James" message="Merry Christmas ! " />
    <MainButton label="Unlock Gift" onclick="#" color="blue" />
    {/* destructuring props */}
    <Greeting1 name="Alice" message="Welcome" emoji="👍" />
    <Greeting2 name="Bob" message="Good Morning" />
    {/* rendering an array */}
    <ArrayPropsRendering fruits={fruits} />
  </StrictMode>
);
