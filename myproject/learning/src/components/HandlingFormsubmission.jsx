import { useState   } from "react";
export default function HandlingFormSubmission() {
    const[formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    function handleSubmit(event) {
        // event.preventDefault() = allows the form not to act in its normal way and maintains the form state even when page is refreshed.  
        event.preventDefault()
        console.log(formData)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <input 
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <input 
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <button>Submit</button>
        </form>
    )

}