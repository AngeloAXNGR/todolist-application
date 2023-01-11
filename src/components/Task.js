import React from 'react'
import TodoContext from '../contexts/TodoContext'
export default function Task() {
  const {
    hideTaskComponent,
    activeProjectTitle, 
    tasks, 
    addTaskToProject, 
    deleteTask, 
    showTaskForm, 
    setShowTaskForm, 
    taskForm, 
    handleTaskForm,
    taskSelected,
    setTaskEdit,
    updateTask,
  } = React.useContext(TodoContext);

  const taskElements = tasks.map(task => {
    return(
      <div class="task">
        <div id="checkbox" onClick={() => deleteTask(task.taskId)}></div>
        {taskSelected.titleField !== task.taskId ?
          <p id="task-title" onClick={(e)=>setTaskEdit(e, task.taskId, task)}>{task.taskTitle}</p>
          :
        <input 
          type="text" 
          name="taskTitle"
          id="task-title-form"
          value={taskForm.taskTitle}
          onChange={handleTaskForm}
          onBlur={()=>updateTask(task.taskId)}
        />
        }
        {taskSelected.dateField !== task.taskId ?
          <p id="task-dueDate" onClick={(e)=>setTaskEdit(e, task.taskId, task)}>{task.taskDueDate.trim() === "" ? "No Due Date" : `${task.taskDueDate}`}</p>
          :
          <input 
            type="date" 
            name="taskDueDate"
            value={taskForm.dueDate}
            onChange={handleTaskForm}
            onBlur={()=>updateTask(task.taskId)}
          />
        }
      </div>
    )
  })



  return (
    <div className='tasks'>
      {hideTaskComponent ? 
      <div>
        <h1>Select a Project</h1>
      </div> 
      : 
      <div>
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
      </div>}
    </div>
  )
}
