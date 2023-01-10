import React from 'react'
import TodoContext from '../contexts/TodoContext'
export default function Task() {
  const {tasks, addTaskToProject, deleteTask} = React.useContext(TodoContext);
  const [taskForm, setTaskForm] = React.useState({taskTitle:''})

  const taskElements = tasks.map(task => {
    return(
      <div className="task">
        {task.taskTitle}
        <button onClick={() => {deleteTask(task.taskId)}}>Delete Task</button>
      </div>
    )
  })
  const handleTaskForm = (event) =>{
    const {name, type, checked, value} = event.target;

    setTaskForm(prevForm => {
      return {...prevForm,
        [name] : type === "checkbox" ? checked : value
      }
    })
  }

  console.log(taskForm);
  return (
    <div className='tasks'>
      <input 
        type="text" 
        name="taskTitle"
        value={taskForm.taskTitle}
        onChange={handleTaskForm}
      />
      <button onClick={() => addTaskToProject(taskForm.taskTitle)}>Add Task</button>
      <div className="task-list">{taskElements}</div>
    </div>
  )
}
