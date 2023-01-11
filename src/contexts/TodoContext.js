import React from "react";
import { auth, db} from '../firebase_config';
import {set, ref, onValue, remove, update} from 'firebase/database';
import { nanoid } from "nanoid";
const TodoContext = React.createContext();

export const TodoProvider = ({children}) =>{

const [todo, setTodo] = React.useState([]);
const [projectForm, setProjectForm] = React.useState({projectTitle: ''});
const [taskForm, setTaskForm] = React.useState({taskTitle:'', taskDueDate:''})
const [showForm, setShowForm] = React.useState(false);
const [showTaskForm, setShowTaskForm] = React.useState(false);
const [hideTaskComponent, setHideTaskComponent] = React.useState(false);
const [selected, setSelected] = React.useState(null);
const [active, setActive] = React.useState(null);
const [activeProjectTitle, setActiveProjectTitle] = React.useState('');
const [tasks, setTasks] = React.useState([]);
const [taskSelected, setTaskSelected] = React.useState({titleField:null, dateField:null});



React.useEffect(() => {
  const renderData = (data) =>{
    Object.values(data).map(todo => {
      todo.tasks = JSON.parse(todo.tasks);
      setTodo(prevTodo => {
        return [...prevTodo, todo]
      })
    })
  }

  auth.onAuthStateChanged((user) =>{
    if(user){
      onValue(ref(db, `/${auth.currentUser.uid}`), snapshot =>{
        setTodo([]);
        const data = snapshot.val();
        if(data !==null){
          renderData(data);
        }
      })
    } 
  })
  }, [])


  React.useEffect(() => {
    const activeProject = todo.find(project => project.projectId === active)
    if(activeProject === undefined){
      setTasks([])
      setHideTaskComponent(true)
    }else{
      setTasks(activeProject.tasks)
      setActiveProjectTitle(activeProject.projectTitle)
      setHideTaskComponent(false)
    }
  }, [todo, active])

  const handleProjectForm = (event) => {
    const {name, type, checked, value} = event.target;
    setProjectForm(prevForm => {
      return {...prevForm,
        [name] : type === "checkbox" ? checked : value
      }
    })
  }

  const addProject = () =>{
    if(projectForm.projectTitle.trim() === ''){
      alert('A project must include a name');
      return;
    }

    const projectId = nanoid()
    set(ref(db, `${auth.currentUser.uid}/${projectId}`),
      {
        projectId: projectId,
        projectTitle: projectForm.projectTitle,
        tasks: JSON.stringify([]),
      }
    )
    setProjectForm({projectTitle: ''});
    setShowForm(false);
  }

  const deleteProject = (projectId) => {
    remove(ref(db, `/${auth.currentUser.uid}/${projectId}`))
    setActive(null);
  }


  const setEdit = (projectId, projectTitle) =>{
    setSelected(projectId)
    setProjectForm({projectTitle: projectTitle})
  }

  const updateProject = (projectId) =>{
    if(projectForm.projectTitle.trim() === ''){
      alert('A project must include a name');
      return;
    }

    const selectedProject = todo.find(project => project.projectId === projectId)
    update(ref(db, `/${auth.currentUser.uid}/${projectId}`),
      {
        projectId: projectId,
        projectTitle: projectForm.projectTitle,
        tasks: JSON.stringify(selectedProject.tasks)
      }
    )
    setSelected(null);
    setProjectForm({projectTitle:''})
  }

  const handleTaskForm = (event) =>{
    const {name, type, checked, value} = event.target;
    setTaskForm(prevForm => {
      return {...prevForm,
        [name] : type === "checkbox" ? checked : value
      }
    })
  }

  const addTaskToProject = (taskTitle) => {
    const activeProject = todo.find(project => project.projectId === active)
    console.log(activeProject);
    
    const newTaskArray = activeProject.tasks
    newTaskArray.push({taskId:nanoid(), taskTitle:taskTitle, taskDueDate:''})
    update(ref(db, `/${auth.currentUser.uid}/${active}`),
    {
      projectId: active,
      projectTitle: activeProject.projectTitle,
      tasks: JSON.stringify(newTaskArray)
    })

    setTaskForm({taskTitle:''});
    setShowTaskForm(false);
  }

  const deleteTask = (taskId) => {
    const activeProject = todo.find(project => project.projectId === active)
    const newTaskArray = activeProject.tasks.filter(task => task.taskId !== taskId);
    
    update(ref(db, `/${auth.currentUser.uid}/${active}`),
    {
      projectId: active,
      projectTitle: activeProject.projectTitle,
      tasks: JSON.stringify(newTaskArray)
    })
  }


  const setTaskEdit = (e, taskId, task) =>{
    e.target.id === "task-title" ? setTaskSelected({titleField:taskId, dateField:null}) : setTaskSelected({titleField:null, dateField:taskId})
    setTaskForm({taskTitle: task.taskTitle, taskDueDate:task.taskDueDate});
  }

  const updateTask = (taskId) =>{
    const activeProject = todo.find(project => project.projectId === active);

    const newTaskArray = activeProject.tasks.map(task => {
      return task.taskId === taskId ? {taskId: taskId, taskTitle:taskForm.taskTitle, taskDueDate:taskForm.taskDueDate } : task
    })

    update(ref(db, `/${auth.currentUser.uid}/${active}`),
    {
      projectId: active,
      projectTitle: activeProject.projectTitle,
      tasks: JSON.stringify(newTaskArray)
    })

    setTaskForm({taskTitle:'', taskDueDate:''});
    setTaskSelected({titleField:null, dateField:null});
  }

  return(
    <TodoContext.Provider
      value={
        {
          todo,
          handleProjectForm,
          projectForm,
          addProject,
          deleteProject,
          selected,
          setEdit,
          updateProject,
          showForm,
          setShowForm,
          active,
          setActive,
          activeProjectTitle,
          tasks,
          setTasks,
          taskForm,
          handleTaskForm,
          addTaskToProject,
          deleteTask,
          showTaskForm,
          setShowTaskForm,
          taskSelected,
          setTaskSelected,
          setTaskEdit,
          updateTask,
          hideTaskComponent
        }
      }
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext;