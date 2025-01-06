import React from 'react'

const TodoFilter = ({ filterTodo }) => {
  return (
      <select name="" id="" onChange = {(e) => filterTodo(e.target.value)}>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
  )
}

export default TodoFilter