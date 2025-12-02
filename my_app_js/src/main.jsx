import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import MainButton from "./Button.jsx";
import Greeting1 from "./DestracturingProps1.jsx";
import Greeting2 from "./DestructuringProps2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App name="Jenipher" message="Hey there ! "/>
    <MainButton label="Testing" onclick="#" color="red"/>
    {/* testing */}
     <App name="James" message="Merry Christmas ! "/>
    <MainButton label="Unlock Gift" onclick="#" color="blue"/>
    {/* destructuring props */}
    <Greeting1 name="Alice" message="Welcome" emoji="👍"/>
    <Greeting2 name="Bob" message="Good Morning"/>

  </StrictMode>
);
