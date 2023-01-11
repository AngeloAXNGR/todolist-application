import React from 'react'
import TodoContext from '../contexts/TodoContext'
import CloseIcon from '../images/close.svg';

export default function Project() {
  const {
    todo, 
    projectForm, 
    showForm,
    setShowForm,
    handleProjectForm, 
    addProject, 
    deleteProject,
    selected,
    setEdit,
    updateProject,
    active,
    setActive
  } = React.useContext(TodoContext);
  

  const [isHover, setIsHover] = React.useState(false);

  const handleMouseEnter = (projectId) =>{
    setIsHover(projectId);
  }

  const handleMouseLeave = () =>{
    setIsHover(null);
  }

  const handleKeyPress = (event) => {
    if(event.key === "Enter"){
      addProject();
    }
  }


  const projects = todo.map(project => {
    return(
      <div>
        { selected !== project.projectId ?
          <div 
            style={active === project.projectId || isHover === project.projectId ? {backgroundColor: '#444444'} : {backgroundColor: '#292929'}} 
            className='project'
            onClick={() =>setActive(project.projectId)}
            onMouseEnter={() => handleMouseEnter(project.projectId)} onMouseLeave={handleMouseLeave}
          >
            <p id="project-title" onClick={()=>setEdit(project.projectId, project.projectTitle)}>{project.projectTitle}</p>
            <img src={CloseIcon} alt="" style={isHover === project.projectId ? {opacity:1} : {opacity:0}} onClick={() => deleteProject(project.projectId)} />
          </div>
          
          :

          <input 
            type="text" 
            name="projectTitle"
            id="edit-project-form"
            value={projectForm.projectTitle}
            onChange={handleProjectForm}
            onBlur={() => updateProject(project.projectId)}
          />
        }
      </div>
    )
  });




  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="project-list">
        {projects}
        { showForm ? 
          <div className="project-form">
            <input
              type="text"
              name="projectTitle"
              value={projectForm.projectTitle}
              onChange={handleProjectForm}
              onKeyPress={handleKeyPress}
            />
            <div className="project-form-buttons">
              <button onClick={addProject}>Create</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>

          :
          
          <button id="create-project" onClick={() => setShowForm(true)}>Create New Project</button>
        } 
      </div>
  </div>
  )
}
