import { useState } from "react";
export default function HandlingMultipleInputs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    return (
        <div>
            <h1>Handling Multiple Inputs in React</h1>
            <form>
                <label>
                    Name:  {formData.name} 
                    {/* Displaying the current value of the name input */}

                    <input onChange={handleChange} type="text" name="name" value={formData.name} />
                </label>
                <br />
                <br />
                <label> 
                    Email:
                    <input onChange={handleChange} type="email" name="email" value={formData.email} />
                </label>
                <br />
                <br />
                <label>
                    Password:
                    <input onChange={handleChange} type="password" name="password" value={formData.password} />
                </label>
            </form>
        </div>
    );
}