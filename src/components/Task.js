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

  const [isHover, setIsHover] = React.useState(false);
  const handleMouseEnter = (taskId) =>{
    setIsHover(taskId);
  }

  const handleMouseLeave = () =>{
    setIsHover(null);
  }

  const taskElements = tasks.map(task => {
    return(
      <div class="task" style={isHover === task.taskId ? {backgroundColor: '#444444'} : {backgroundColor: '#202020'}} onMouseEnter={() => handleMouseEnter(task.taskId)} onMouseLeave={handleMouseLeave}>
        <div id="checkbox" onClick={() => deleteTask(task.taskId)}></div>
        {taskSelected.titleField !== task.taskId ?
          <p id="task-title" onClick={(e)=>setTaskEdit(e, task.taskId, task)}>{task.taskTitle}</p>
          :
        <input 
          type="text" 
          name="taskTitle"
          id="task-title-form"
          className="edit-task-form"
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
            className="edit-task-form"
            value={taskForm.dueDate}
            onChange={handleTaskForm}
            onBlur={()=>updateTask(task.taskId)}
          />
        }
      </div>
    )
  })


  const handleKeyPress = (event, taskTitle) =>{
    if(event.key === "Enter"){
      addTaskToProject(taskTitle)
    }
  }



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
                onKeyPress={(e) => handleKeyPress(e, taskForm.taskTitle)}
              />
              <div className="task-form-buttons">
                <button onClick={() => addTaskToProject(taskForm.taskTitle)}>Create</button>
                <button onClick={() => setShowTaskForm(false)}>Cancel</button>
              </div>
            </div>
            :
            <button id="create-task" onClick={() => setShowTaskForm(true)}>Create New Task</button>
          }
        </div>
      </div>}
    </div>
  )
}
