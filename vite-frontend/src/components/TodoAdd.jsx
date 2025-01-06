import {useForm} from 'react-hook-form'

const TodoAdd = ({addTodo}) => {
  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  // Handle form submission and rest
  const onSubmit = (data) => {
    addTodo(data);
    reset();
  }

  return (
    <div className="todo-add">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="task">Task:</label>
              <input type="text" id="task" placeholder="Enter Todo" {...register("task", { required: true })}/>
              {errors.task?.type === 'required' && <small>This field is required</small>}

              <label htmlFor="description">Description:</label>
              <textarea id="description" placeholder="Enter Description" {...register("description")}></textarea>
           
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default TodoAdd