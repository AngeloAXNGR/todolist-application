import React from "react";
import { auth, db} from '../firebase_config';
import {set, ref, onValue, remove, update} from 'firebase/database';
import { nanoid } from "nanoid";
const TodoContext = React.createContext();

export const TodoProvider = ({children}) =>{

const [todo, setTodo] = React.useState([]);
const [projectForm, setProjectForm] = React.useState({projectTitle: ''});
const [showForm, setShowForm] = React.useState(false);
const [selected, setSelected] = React.useState(null);
const [active, setActive] = React.useState(null);

const [tasks, setTasks] = React.useState([]);


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
        // console.log(data);
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
    }else{
      setTasks(activeProject.tasks)
    }
    // console.log(tasks)
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
        // tasks: JSON.stringify([{taskId: nanoid(), taskTitle: 'Test Task'}]),
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


  const addTaskToProject = (taskTitle) => {
    const activeProject = todo.find(project => project.projectId === active)
    console.log(activeProject);
    
    const newTaskArray = activeProject.tasks
    newTaskArray.push({taskId:nanoid(), taskTitle:taskTitle})
    update(ref(db, `/${auth.currentUser.uid}/${active}`),
    {
      projectId: active,
      projectTitle: activeProject.projectTitle,
      tasks: JSON.stringify(newTaskArray)
    })
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
          tasks,
          setTasks,
          addTaskToProject,
          deleteTask
        }
      }
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext;