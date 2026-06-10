import { useState } from "react";
export default function HandlingUserInput() {
    const [nameInput,setNameInput] = useState("");
    const [emailInput,setEmailInput] = useState("");

    //     Step-by-step:
    // You type: J
    // input value = "J"
    // setNameInput("J")
    // React re-renders
    // input value becomes "J"
    // You type: o
    // input value = "Jo"
    // setNameInput("Jo")
    // React re-renders
    // input value becomes "Jo"

    function handleChange(e) {
        console.log(e.target.value);
        const { name, value } = e.target;
        if (name === "name") {
            setNameInput(value);
        } else if (name === "email") {
            setEmailInput(value);
        }
    }
  return (
      <div>
            <h1>Handling User Input</h1>
            {/* creating the form */}
            <form>
              <label>
                Name:
                {/* <input onChange={()} type="text" value={nameInput} /> */}
                <input onChange={(e) => handleChange(e)} type="text" name="name" value={nameInput} />
              </label>
              <br />
              <br />
              {/* direct reference */}
              <label>
                Email:
                <input onChange={(e) => setEmailInput(e.target.value)} type="email" name="email" value={emailInput} />
              </label>
            </form>
          </div>
        );
}