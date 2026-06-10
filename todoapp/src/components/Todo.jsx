

import TodoDisplay from './TodoDisplay';
import ToDoForm from './TodoForm';
import { useState  } from 'react';

export default function Todo() {

const [myTodos, setMyTodos] = useState([])

    return <>
        {/* title */}
        <h2 className="text-center p-5 fw-bold">WELCOME TO MY TODO APP</h2>

        {/* form */}
        <div className="justify-content-center align-items-center d-flex w-60">
            <ToDoForm myTodos = {myTodos} setMyTodos = {setMyTodos}/>
        </div>

        {/* table */}
        <div className='m-5'>
            <TodoDisplay Todos={myTodos} setMyTodos={setMyTodos}/>
        </div>



    </>
}