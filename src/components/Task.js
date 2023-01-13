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

  const [dateToday, setDateToday] = React.useState('');

  React.useEffect(() => {
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()
    setDateToday(`${year}-${month}-${day}`);
  }, [])


  const getUnix = (date) => {
    return (new Date(date).getTime() / 1000)
  }

  const taskElements = tasks.map(task => {
    const dueDateStyle = {
      backgroundColor: getUnix(dateToday) === getUnix(task.taskDueDate) ? "rgb(219, 150, 0)" : 
                       getUnix(dateToday) > getUnix(task.taskDueDate) ? "rgb(201, 95, 95)" : "#292929"
    }

    return(
      <div class="task" style={Object.assign({},dueDateStyle)}>
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
      <div className="no-project-selected">
        <h2>Select a Project to Start Adding Tasks</h2>
      </div> 
      : 
      <div className="task-list">
        <h2>{activeProjectTitle}</h2>
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
      </div>}
    </div>
  )
}
