import { useState, useEffect } from 'react'

import axios from 'axios'

import TodoHeader from './components/TodoHeader'
import TodoAdd from './components/TodoAdd'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

// function App is the main component in the app, which acts as the parent component for TodoAdd, TodoFilter, and TodoList components
function App() {
  // React Hooks let us to manage state (data that can change) in functional component and other React features (lifecycle methods)
  // todos is an array of todo items, setTodos is a function used to update the todos array
  // const [allTodos, setAllTodos] = useState([
  //   { id: 0, task: "Learn JavaScript", status: "Active" },
  //   { id: 1, task: "Read a self-help book", status: "Active" },
  //   { id: 2, task: "Play PS5", status: "Active" },
  //   { id: 3, task: "Watch YouTube videos", status: "Active" },
  // ]);
  // const [todos, setTodos] = useState(allTodos);

  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");

  // Fetch data from API Endpoint
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos")
      .then(response => {
        setAllTodos(response.data);
        setTodos(response.data);
      })
      .catch(error => setErrors(error.message))
  }, [])

  // Function to remove a todo id (Update the UI then send to the backend server to perform deletion)
  const deleteTodo = (id) => {
    const updatedTodos = allTodos.filter(todo => todo.id !== id); 
    setAllTodos(updatedTodos);
    setTodos(updatedTodos);
    console.log("Deleted Todo with id: ", id);

    axios.delete(`http://127.0.0.1:8000/todos/${id}/`)
    .catch(error => setErrors(error.message))
  }

  // Function to add todo (data is the object created by the track-hook-form)
  const addTodo = (data) => {
    const newId = allTodos.length === 0 ? 0 : parseInt(allTodos[allTodos.length - 1].id) + 1;
    const newTodo = { ...data, id: newId};
    const updatedTodos = [...allTodos, newTodo];
    setAllTodos(updatedTodos);
    setTodos(updatedTodos);
    console.log(updatedTodos);

    axios.post("http://127.0.0.1:8000/todos/", newTodo)
    .catch( error => setErrors(error.message) );
  }

  // Function to update todo
  const updateTodo = (id, updated_task, updated_description) => {
    const updatdedTodos = allTodos.map(todo => todo.id == id ? {...todo, task: updated_task, description: updated_description}: todo);
    setAllTodos(updatdedTodos);
    setTodos(updatdedTodos);
    console.log(updatdedTodos);

    axios.patch(`http://127.0.0.1:8000/todos/${id}/`, {task: updated_task, description: updated_description})
    .catch( error => setErrors(error.message));
  }

  // Function to update complete todo item
  let completeTodo =  (e, id) => {
    // if (e.target.checked){
    //   const completedTodos = allTodos.map(todo => todo.id == id ? {...todo, status: "Completed"}: todo)
    //   setAllTodos(completedTodos);
    //   setTodos(completedTodos);
    // }
    // else{
    //   const completedTodos = setTodos(todos.map(todo => todo.id == id ? {...todo, status: "Active"}: todo))
    //   setAllTodos(completedTodos);
    //   setTodos(completedTodos);
    // }
    if (e.target.checked){
      console.log("Completed Todo with id: ", id);
      const completedTodos = allTodos.map(todo => todo.id == id ? {...todo, completed: true }: todo);
      setAllTodos(completedTodos);
      setTodos(completedTodos);

      axios.patch(`http://127.0.0.1:8000/todos/${id}/`, { completed: true })
      .catch( error => setErrors(error.message));
    }
  }

  // Function to filter the todo state
  let filterTodo = (status) => {
    if (status === "Active") {
      console.log("Active mode");
      setTodos(allTodos.filter(todo => !todo.completed));  
    } else {
      console.log("Completed mode");
      setTodos(allTodos.filter(todo => todo.completed)); 
    }
  };

  // Returns a container that holds all the child components 
  return (
    <div className="todo-container">
      {errors && <p> {errors} </p>}
      <TodoHeader/>
      <TodoAdd addTodo={addTodo}/>
      <TodoFilter filterTodo = {filterTodo} />
      <TodoList totalTodos= {allTodos.length} todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} completeTodo={completeTodo} filterTodo = {filterTodo} /> {/* Pass the todos array and deleteTodo function as props */}
    </div>
  )
}

export default App
