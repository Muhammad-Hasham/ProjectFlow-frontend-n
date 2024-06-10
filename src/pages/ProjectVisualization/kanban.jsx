// Import necessary modules and styles
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button } from '../../components'; // Assuming Button is imported from 'components'
import { useNavigate, useParams } from 'react-router-dom';
import ProjectProgress from './details';
import KanbanPopup from './kanbanpopup';
import './KanbanComponent.css'; // Import your CSS file with responsive styles
import axios from 'axios';

const KanbanComponent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });
  const { todo, inProgress, completed } = tasks;
  let userrole=localStorage.getItem("role");

  useEffect(() => {
    // Fetch project details from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the project details using a GET request
    fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data.project.tasks);
        setTasks({
          todo: data.data.project.tasks.filter((task) => task.status === 'todo'),
          inProgress: data.data.project.tasks.filter((task) => task.status === 'inProgress'),
          completed: data.data.project.tasks.filter((task) => task.status === 'completed'),
        });

        setAssigne(data.data.project.Members);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const [newCategory, setNewCategory] = useState('');
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [showKanbanPopup, setShowKanbanPopup] = useState(false);
  const [categoryToAddTask, setCategoryToAddTask] = useState('');
  const [assigne, setAssigne] = useState([]);
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newTasks = { ...tasks };

    if (!newTasks[destination.droppableId]) {
      newTasks[destination.droppableId] = [];
    }

    const sourceTasks = [...newTasks[source.droppableId]];
    const [removedTask] = sourceTasks.splice(source.index, 1);

    const destinationTasks = [...newTasks[destination.droppableId]];
    destinationTasks.splice(destination.index, 0, removedTask);

    newTasks[source.droppableId] = sourceTasks;
    newTasks[destination.droppableId] = destinationTasks;

    setTasks(newTasks);

    // Update task status in the API
    const taskToUpdate = tasks[source.droppableId][source.index];
    const newStatus = destination.droppableId;

    // Make API call to update task status
    updateTaskStatus(taskToUpdate.id, newStatus);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const token = localStorage.getItem("token");

    axios
      .patch(
        `https://projectflow-cgjn.onrender.com/api/v1/tasks/${taskId}`,
        {
          status: newStatus,
          updated_By:localStorage.getItem("userid"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(`Task ${taskId} status updated successfully:`, response.data);
      })
      .catch((error) => {
        console.error(`Error updating task ${taskId} status:`, error);
      });
  };

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newCategory]: [],
      }));
      setNewCategory('');
      setShowAddCategoryPopup(false);
    }
  };

  // Delete a category
  const handleDeleteCategory = (category) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[category];
    setTasks(updatedTasks);
  };

  // Open KanbanPopup for adding a task to a category
  const handleAddTaskToCategory = (category) => {
    setCategoryToAddTask(category);
    setShowKanbanPopup(true);
  };

  // Close KanbanPopup
  const closeKanbanPopup = () => {
    setShowKanbanPopup(false);
    setCategoryToAddTask('');
  };

  const handleAddTask = (newTaskData, category) => {
    const token = localStorage.getItem("token");
  
    // Your logic for creating the task
    const formData = {
      name: newTaskData.name,
      end_date: newTaskData.end_date,
      description: newTaskData.description,
      assignee: newTaskData.assignee, // Correct the property name
      project: projectId,
      status: category,
    };
    
  
    axios
      .post("https://projectflow-cgjn.onrender.com/api/v1/tasks", JSON.stringify(formData), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response from server:", response); // Log the response
        return response; // Try to parse response as JSON
      })
      .then((data) => {
        console.log("Task created successfully:", data);
        // Update the state to reflect the new task in the specified category
        setTasks((prevTasks) => {
          const categoryTasks = [...prevTasks[category]];
          const newTask = {
            id: data.id, // Use the task ID returned from the server
            content: newTaskData.name,
            project: newTaskData.projectId,
            assignee:newTaskData.assign,
            end_date: newTaskData.end_date,
            
            description: newTaskData.description,
          };
  
          categoryTasks.push(newTask);
  
          return {
            ...prevTasks,
            [category]: categoryTasks,
          };
        });
  
        // Close the KanbanPopup
        setShowKanbanPopup(false);
      })
      .catch((error) => {
        console.error("Task creation failed", error);
        // Handle errors and show appropriate messages
      });
  };
  

  return (
    <div>
      <ProjectProgress />

      <div style={{ marginTop: "-350px" }} className="kanban-container">
        {/* KanbanComponent content */}
        <DragDropContext  onDragEnd={onDragEnd}>
          <div className="kanban-columns">
            {/* Render existing categories */}
            {Object.keys(tasks)
              .sort()
              .map((columnId) => (
                <div key={columnId} className="kanban-column">
                  <div className="column-header">
                    <h3>{columnId === 'inProgress' ? 'IN PROGRESS' : columnId.toUpperCase()}</h3>
                    <div className="column-buttons">
                    {userrole==="Project Manager"  && (
                      <Button shape="round" onClick={() => handleDeleteCategory(columnId)} className="delete-button">
                        -
                      </Button>
                    )}
                    {userrole==="Project Manager"  && (
                      <Button
                      data-testid="add"
                        shape="round"
                        color="indigo_800_01"
                        onClick={() => handleAddTaskToCategory(columnId)}
                      >
                        +
                      </Button>
                    )}
                    </div>
                  </div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? '#A3BFFA' : '#EDF2F7',
                          padding: '16px',
                          minHeight: '150px',
                          borderRadius: '8px',
                        }}
                      >
                        {tasks[columnId]?.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: '16px',
                                  margin: '0 0 16px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#4299E1' : '#2C5282',
                                  color: 'white',
                                  borderRadius: '8px',
                                  ...provided.draggableProps.style,
                                }}
                                
                              >
                                {task.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}

            {/* Render the new category if it exists */}
            {newCategory.trim() !== '' && (
              <div key={newCategory} className="kanban-column">
                <div className="column-header">
                  <h3>{newCategory.toUpperCase()}</h3>
                  <div className="column-buttons">
                  {userrole==="Project Manager"  && (
                    <Button shape="round" onClick={() => handleDeleteCategory(newCategory)} className="delete-button">
                      -
                    </Button>
                  )}
                    {userrole==="Project Manager"  && (
                    <Button shape="round" color="indigo_800_01" onClick={() => handleAddTaskToCategory(newCategory)}>
                      +
                    </Button>
                    )}
                  </div>
                </div>
                <Droppable droppableId={newCategory} key={newCategory}>
                  {/* Content for the new category */}
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? '#A3BFFA' : '#EDF2F7',
                        padding: '16px',
                        minHeight: '150px',
                        borderRadius: '8px',
                      }}
                    >
                      {tasks[newCategory]?.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: '16px',
                                margin: '0 0 16px 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#4299E1' : '#2C5282',
                                color: 'white',
                                borderRadius: '8px',
                                ...provided.draggableProps.style,
                              }}
                            >
                              {task.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </div>
        </DragDropContext>

       {/* Add category popup */}
       {showAddCategoryPopup && (
          <div className="add-category-popup">
            <label htmlFor="newCategory">Enter Category Name: </label>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button shape="round" color="indigo_800_01" onClick={handleAddCategory}>
              Add
            </Button>
            <Button shape="round" onClick={() => setShowAddCategoryPopup(false)} className="cancel-button">
              Cancel
            </Button>
          </div>
        )}

        {/* Kanban popup */}
        {showKanbanPopup && (
          <KanbanPopup
            task={{
              name: '',
              end_date: '',
              assignee:'',
              description: '',
            }}
            onClose={closeKanbanPopup}
            onAddTask={(newTaskData) => handleAddTask(newTaskData, categoryToAddTask)}
            assigne={assigne}
          />
        )}

        {/* Button to add a new category */}
        <div className="add-category-button">
        {userrole==="Project Manager"  && (
          <Button data-testid="add" style={{ position: 'absolute', top: 400, right: 80, margin: '8px' }} shape="round" color="indigo_800_01" onClick={() => setShowAddCategoryPopup(true)}>
            +
          </Button>
        )}
        </div>
      </div>
    </div>
  );
};

export default KanbanComponent;
