import React from 'react'
import TodoContext from '../contexts/TodoContext'
export default function Task() {
  const {
    activeProjectTitle, 
    tasks, 
    addTaskToProject, 
    deleteTask, 
    showTaskForm, 
    setShowTaskForm, 
    taskForm, 
    handleTaskForm,
    taskSelected,
    setTaskSelected,
    setTaskEdit,
    updateTask,
  } = React.useContext(TodoContext);

  console.log(taskForm);
  const taskElements = tasks.map(task => {
    return(
      <div>
      {taskSelected !== task.taskId ?
        <div className="task">
          <p id="task-title" onClick={() => setTaskEdit(task.taskId, task)}>{task.taskTitle}</p>
          <button onClick={() => {deleteTask(task.taskId)}}>Delete Task</button>
        </div>
        :
        <input 
          type="text" 
          name="taskTitle"
          value={taskForm.taskTitle}
          onChange={handleTaskForm}
          onBlur={()=>updateTask(task.taskId)}
        />
      }
      </div>
    )
  })

  return (
    <div className='tasks'>
      <h1>{activeProjectTitle}</h1>

      <div className="task-list">
        {taskElements}

        {showTaskForm ?
          <div className="task-form">
            <input
              type="text"
              name="taskTitle"
              value={taskForm.taskTitle}
              onChange={handleTaskForm}
            />
            <button onClick={() => addTaskToProject(taskForm.taskTitle)}>Add Task</button>
          </div>

          :

          <button onClick={() => setShowTaskForm(true)}>Create Task</button>
        }


      </div>
    </div>
  )
}
