import React from 'react'
import TodoContext from '../contexts/TodoContext'

export default function Project() {
  const {
    todo, 
    projectForm, 
    handleProjectForm, 
    addProject, 
    deleteProject,
    selected,
    setSelected,
    updateProject,
  } = React.useContext(TodoContext);

  console.log(projectForm);

  const projects = todo.map(project => {
    return(
      <div className="project">
        { selected !== project.projectId ?
          <p onClick={()=>setSelected(project.projectId)}>{project.projectTitle}</p>

          :

          <input 
            type="text" 
            name="projectTitle"
            value={projectForm.projectTitle}
            onChange={handleProjectForm}
            onBlur={() => updateProject(project.projectId)}
          />
        }
        
        <button onClick={() => deleteProject(project.projectId)}>Delete</button>
      </div>
    )
  });

  return (
    <div className="projects">
    <input 
      type="text" 
      name="projectTitle"
      value={projectForm.projectTitle}
      onChange={handleProjectForm}

    />
    <button onClick={addProject}>Add Project</button>
    <div className="projects-list">
      {projects}
    </div>
  </div>
  )
}
