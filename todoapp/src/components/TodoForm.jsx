import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function ToDoForm({ myTodos, setMyTodos }) {

    const [todo, setTodo] = useState({ id: '', title: '', description: '', completed: true })


    function HandleChange(e) {
        const { name, value } = e.target;
        setTodo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    function HandleSubmit(e) {
        e.preventDefault();
        // THE ... INTERMEDIARY ONLY WORKS WITH ARRAYS NOT OBJECTS
        setMyTodos([...myTodos, { id: myTodos.length + 2, title: todo.title, description: todo.description}]);
        setTodo({ title: '', description: '' })
    }
    return (
        <>
            <Form className='mx-5 w-100' onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Todo Item</Form.Label>
                    <Form.Control onChange={HandleChange} type="text" placeholder="enter title" name='title' value={todo.title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={HandleChange} as="textarea" name='description' placeholder='enter todo description...' value={todo.description} rows={3} />
                </Form.Group>
                <Button className='form-control fw-bold' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {/* {console.log (myTodos)} */}
            {/* displaying the todos */}
        </>
    )
}