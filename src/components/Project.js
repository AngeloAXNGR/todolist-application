import React from 'react'
import TodoContext from '../contexts/TodoContext'

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

  const projects = todo.map(project => {
    return(
      <div>
        { selected !== project.projectId ?
          <div 
            style={active === project.projectId ? {backgroundColor: '#444444'} : {backgroundColor: '#292929'}} 
            className='project'
            onClick={() =>setActive(project.projectId)}
          >
            <p onClick={()=>setEdit(project.projectId, project.projectTitle)}>{project.projectTitle}</p>
            <button onClick={() => deleteProject(project.projectId)}>Delete</button>
          </div>
          
          :

          <input 
            type="text" 
            name="projectTitle"
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
              onBlur={addProject}
            />
            <button onClick={addProject}>Add Project</button>
          </div>

          :
          
          <button onClick={() => setShowForm(true)}>Create Project</button>
        } 
      </div>
  </div>
  )
}
