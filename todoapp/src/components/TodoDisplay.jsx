import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Toast from 'react-bootstrap/Toast';


export default function TodoDisplay({ Todos = [], setMyTodos }) {
    const [taskStatus, setTaskStatus] = useState(false);
    const [completedTasks, setCompleteTasks] = useState(0);
    const [incompleteTasks, setIncompleteTasks] = useState(0);

    useEffect(() => {
        setCompleteTasks(Todos.filter(todo => todo.completed).length);
        setIncompleteTasks(Todos.filter(todo => !todo.completed).length);
       
    }, [Todos]);

    console.log("============")
    console.log({ Todos })
    function HandleDelete(id) {
        // so recreate recreating the myTodos list be remove the one with that id
        const updatedTodos = Todos.filter(todo => todo.id !== id)
        setMyTodos(updatedTodos)
    }
    function HandleTaskStatus(id) {
        const newTodos = Todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        setMyTodos(newTodos)
    }

    return (
        <>
            <Toast className="my-5">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Task Statistics</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Completed Tasks : {completedTasks}</Toast.Body>
                <Toast.Body>Incomplete Tasks : {incompleteTasks}</Toast.Body>
            </Toast>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ToDo ID</th>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {Todos.map((todo) => (
                        <tr key={todo.id}>
                            <td className={todo.completed ? 'text-decoration-line-through' : ''}>{todo.id}</td>
                            <td className={todo.completed ? 'text-decoration-line-through' : ''}>{todo.title}</td>
                            <td className={todo.completed ? 'text-decoration-line-through' : ''}>{todo.description}</td>
                            <td >
                                <div className='justify-content-center aligh-items-center d-flex'>
                                    <button onClick={() => HandleDelete(todo.id)} className="btn-danger m-1 btn"> delete</button>
                                    <button onClick={() => HandleTaskStatus(todo.id)}
                                        className={`btn ${todo.completed ? "btn-secondary" : "btn-success"} m-1`}>
                                        {todo.completed ? "not completed" : "completed"}
                                    </button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table></>

    );
}