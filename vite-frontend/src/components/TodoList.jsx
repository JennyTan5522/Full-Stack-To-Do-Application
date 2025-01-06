import React, {useState} from 'react';
import { FaEdit } from 'react-icons/fa';  
import { MdDelete } from 'react-icons/md';  

const TodoList = ({ totalTodos, todos, deleteTodo, updateTodo, completeTodo }) => {

    let [ toggle, setToggle ] = useState(false);
    let [ todoTask, setTodoTask] = useState("");
    let [ todoDescription, setTodoDescription] = useState("");
    let [ todoId, setTodoId ] = useState("");

    const toggleModal = (todoTask, todoDescription, id) => {
        setToggle(true)
        setTodoTask(todoTask)
        setTodoDescription(todoDescription)
        setTodoId(id)
    }

    return (
        <> {/* <>: Add this if we have multiple JSX elements that need to be returned */}

        {/* Loops through each item (todo) in the todos array, where the key is used to uniquely identify each item
                todos.map(..): Loops through the todos array.
                todo =>      : Arrow function processes each todo object.
                key={todo.id}: Provides a unique identifier for React to manage updates efficiently.
                () => is an arrow function that used to cerate an anonymous function that will be executed when the onClick event occurs. Without () =>, react runs immediately during rendering
        */}

        <div className="my-tasks">
            <p className="my-task-header">My Tasks</p>
            <p className="task-left">You have {totalTodos} tasks left!</p>
        </div>

        <div className="todo-list">
            {todos.map( todo => <div className="todo-list-item" key = {todo.id}> 
                <div className="task">
                    <input type="checkbox" onChange={(e) => completeTodo(e, todo.id)}/> {/* e is the default event object */}
                    <div className="task-list">
                        <p id = "t_task" className = {todo.completed == true ? "strike": ""}> {todo.task}</p>
                        <p className = "list-description"> {todo.description} </p>
                    </div>
                </div>

                <div className="btn-container">
                    <button className="edit"> <FaEdit size={20} onClick={() => toggleModal(todo.task, todo.description, todo.id) }/> </button>
                    <button className="del"> <MdDelete size={20} onClick={() => deleteTodo(todo.id)}/> </button>
                </div>
            </div>)}
        </div>

        {/* Update ToDo Item Container */}
        {toggle && 
            <div className = "modal-container">
                <div className = "modal">
                    <h1>Update Todo Item</h1>
                    <form action = "" onSubmit= { (e) => { e.preventDefault(); updateTodo(todoId, todoTask, todoDescription); setToggle(false) }} >
                        <div className="update-container">
                            <input className = "update-task" type = "text" placeholder = "Update Todo Task" value = { todoTask } onChange = {(e) => setTodoTask(e.target.value) } required />
                            <textarea className = "update-description" placeholder = "Update Todo Description" value = { todoDescription } onChange = {(e) => setTodoDescription(e.target.value) } />
                        </div> 
                    
                        <div className = "btn-container">
                            <button className="mod-btn" id="add">Update</button>
                            <button className="mod-btn" onClick = {() => setToggle(false) }>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        }
        </>
    )
}

export default TodoList

