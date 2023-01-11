import React from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db} from '../firebase_config';
import {set, ref, onValue, remove, update} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
const TodoContext = React.createContext();

export const TodoProvider = ({children}) =>{

const [todo, setTodo] = React.useState([]);
const [projectForm, setProjectForm] = React.useState({projectTitle: ''});
const [selected, setSelected] = React.useState(null);



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
        console.log(data);
        if(data !==null){
          renderData(data);
        }
      })
    } 
  })
}, [])


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
      tasks: JSON.stringify([{taskId: nanoid(), taskTitle: 'Test Task'}]),
    }
  )
  setProjectForm({projectTitle: ''});
}


const deleteProject = (projectId) => {
  remove(ref(db, `/${auth.currentUser.uid}/${projectId}`))
}

const updateProject = (projectId) =>{
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
          setSelected,
          updateProject
        }
      }
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext;