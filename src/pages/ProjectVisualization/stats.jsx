import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,} from "recharts";
import { PieChart } from "react-minimal-pie-chart";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from "@mui/material";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Img, Button } from "components";
import ProjectProgress from "./details";
import "./TaskDetailsPopup.css";
import _ from 'lodash';


const TaskDetailsPopup = ({ task, onClose, onDelete, teamMembers,tasks  }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  console.log(tasks)
  let userrole=localStorage.getItem("role")
  console.log(teamMembers)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  

  const handleSaveChanges = async () => {
 
    try {
      const token = localStorage.getItem("token");
      // Assuming you have an update API endpoint like 'UpdateApi'
      const response = await fetch(`https://projectflow-cgjn.onrender.com/api/v1/tasks/${editedTask.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
        updated_By:localStorage.getItem("userid")
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Handle success, close the popup or update state as needed
      alert('Task updated successfully');
      onClose(); // Close the popup
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      // Assuming you have a delete API endpoint like 'DeleteApi'
      const response = await fetch(`https://projectflow-cgjn.onrender.com/api/v1/tasks/${editedTask.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Handle success, close the popup or update state as needed
      alert('Task deleted successfully');
      onClose(); // Close the popup
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const popupAnimation = useSpring({
    from: { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
    to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
  });

  return (
    <>
    
      {/* Background Overlay */}
      <div className="popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(5px)", zIndex: 1, }}
        onClick={onClose} // Close the popup if clicked outside the form
></div>
      {/* Popup */}
      {userrole==="Project Manager"  && (
      <animated.div className="task-details-popup" style={{ ...popupAnimation, zIndex: 2,}}>
        <h2>Edit Task: {editedTask.name}</h2>
        <div className="field">
          <label>Task Name:</label>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label>Due Date:</label>
          <input
            type="date"
            name="end_date"
            value={editedTask.end_date}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label>Assignee:</label>
          <select
            name="assignee"
            value={editedTask.assignee ? editedTask.assignee.id : ""}
            onChange={handleInputChange}
          >
            {/* Assuming that editedTask.assignee.id is the unique identifier for each team member */}
            {teamMembers.map((teamMember) => (
              <option key={teamMember.id} value={teamMember.id}>
                {teamMember.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
  <label>Pre Dependency:</label>
  <select
    name="pre_dependency"
    value={editedTask.pre_dependency} // Assuming pre_dependency is a property in editedTask
    onChange={handleInputChange} // Call handleInputChange when the value changes
  >
    {/* Assuming that tasks contains the list of tasks */}
    <option value="">None</option> {/* Add an option for no pre-dependency */}
    {tasks.map((task) => (
      <option key={task.id} value={task.id}>
        {task.name}
      </option>
    ))}
  </select>
</div>

        {userrole==="Project Manager"  && (
        <Button
          style={{ backgroundColor: " #48BB78", color: "#ffffff" }}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
        )}

{userrole==="Project Manager"  && (
        <Button
          style={{ backgroundColor: " #BE3144", color: "#ffffff" }}
          onClick={handleDelete}
        >
          Delete Task
        </Button>
)}

{userrole==="Project Manager"  && (
        <Button
          style={{ backgroundColor: " #323F73", color: "#ffffff" }}
          onClick={onClose}
        >
          Close
        </Button>
)}
      </animated.div>
      )}
    </>
  );
};

const TaskTable = ({ tasks, projectId, teamMembers }) => {
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handlePopupClose = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    // Implement task deletion logic here
    // You may want to use an API call or update state to remove the task
    console.log("Deleting task:", selectedTask);
    handlePopupClose(); // Close the popup after deletion
  };

  let userrole=localStorage.getItem("role")

  return (
    
    <div>
      {userrole !="Client" && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "poppins",
          marginTop: "80px",
        }}
      >
        <h2
          style={{
            color: "#323F73",
            marginBottom: "10px",
            marginLeft: "30px",
            fontFamily: "poppins",
            fontSize: "30px",
          }}
        >
          Task List
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: "50px",
              marginBottom: "20px",
            }}
          >
            {/* '+' Button for Creating Tasks */}
            {userrole==="Project Manager"  && (
            <Link to={`/newtask/${projectId}`}>
              <Button
                style={{
                  cursor: "pointer",
                  minWidth: "40px",
                  marginRight: "50px",
                  fontSize: "30px",
                  color: "#323F73",
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1px solid #323F73",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onClick={() => navigate(`/newtask/${projectId}`)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#323F73";
                  e.currentTarget.style.color = "#F8FAFC";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "#323F73";
                }}
              >
                +
              </Button>
           
            </Link>
               )}
            {/* Button to Invite */}
            {userrole==="Project Manager"  && (
            <Button
              className="cursor-pointer leading-[normal] min-w-[84px] text-base text-center tracking-[0.44px]"
              shape="round"
              style={{
                backgroundColor: "#860A35",
                color: "#ffffff",
                marginRight: "50px",
              }}
              onClick={() => navigate("/invite")}
            >
              Invite
            </Button>
            )}
          </div>
        </div>
      </div>
      )}
      <div style={{ width: "98%", margin: "0 auto", marginLeft: '-20px'}}> {/* Adjusted width and added margin */}
      {userrole !="Client" && (
  <TableContainer
    component={Paper}
    style={{
      marginBottom: "20px",
      marginLeft: "30px",
      background: "#f5f5f5",
      fontFamily: "poppins",
    }}
  >
    <Table style={{ minWidth: 500, background: "#f5f5f5" }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ color: "#323F73" }}>Task Name</TableCell>
          <TableCell style={{ color: "#323F73" }}>Task Status</TableCell>
          <TableCell style={{ color: "#323F73" }}>Priority</TableCell>
          <TableCell style={{ color: "#323F73" }}>Start Date</TableCell>
          <TableCell style={{ color: "#323F73" }}>Due Date</TableCell>
          <TableCell style={{ color: "#323F73" }}>Task Assignee</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow
            key={index}
            onClick={() => handleTaskClick(task)}
            style={{ cursor: "pointer" }}
          >
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.start_date.substring(0, 10)}</TableCell>
            <TableCell>{task.end_date.substring(0, 10)}</TableCell>
            <TableCell>{task.assignee? task.assignee.name:"null"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
   )}
</div>

      {/* TaskDetailsPopup */}
      {selectedTask && userrole==="Project Manager" && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={handlePopupClose}
          onDelete={handleDeleteTask}
          teamMembers={teamMembers}
          tasks={tasks}
        />
      )}
     
    </div>
 
  );
};

const ProjectStats = ({
  statisticsData,
  pieChartSize,
  pieChartData,
  tasks,
  projectId,
  teamMembers,
}) => {
  const [hoveredPie, setHoveredPie] = useState(false);

  const progressAnimation = useSpring({
    opacity: 1,
    value: pieChartData[0]?.value || 0,
    from: { opacity: 0, value: 0 },
  });

  return (
    <div>
      <ProjectProgress />
      <div style={{ marginLeft: "350px", marginTop: "-180px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "-60px",
          }}
        >
          <div style={{  marginTop: "-150px", marginRight: '20px', width: "50%", height: 300, backgroundColor: "#F7F1E5", borderRadius: 10, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          
        <ResponsiveContainer width="99%" height={300}>
    <LineChart
      data={statisticsData}
      margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
    >
      <XAxis
        dataKey="name"
        label={{
          value: "Days",
          position: "insideBottom",
          offset: 0,
        }}
        tick={{ fontSize: 12 }}
      />
      <YAxis
        label={{ value: "Tasks", angle: -90, position: "insideLeft" }}
        tick={{ fontSize: 12 }}
      />
      <Tooltip
        wrapperStyle={{ backgroundColor: "#ffffff", border: "1px solid #cccccc", borderRadius: "5px" }}
        contentStyle={{ fontSize: "14px" }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="progress"
        name="Progress"
        stroke="#4C51BF"
        strokeWidth={2}
        dot={{ stroke: "#4C51BF", fill: "#ffffff", strokeWidth: 2, r: 5 }}
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="completedTasks"
        name="Completed Tasks"
        stroke="#48BB78"
        strokeWidth={2}
        dot={{ stroke: "#48BB78", fill: "#ffffff", strokeWidth: 2, r: 5 }}
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="remainingTasks"
        name="Remaining Tasks"
        stroke="#F6E05E"
        strokeWidth={2}
        dot={{ stroke: "#F6E05E", fill: "#ffffff", strokeWidth: 2, r: 5 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
<div
  style={{
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F1E5",
    borderRadius: 10,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginTop: '-150px',
    marginRight: '50px'
  }}
>
{/* Animated Pie Chart */}
<ResponsiveContainer width="50%" height={200}>
    <PieChart
      animate
      animationDuration={1000}
      animationEasing="ease-out"
      center={[pieChartSize / 2, pieChartSize / 2]}
      data={pieChartData}
      label={({ dataEntry }) => Math.round(dataEntry.value) + "%"}
      labelPosition={50}
      labelStyle={{
        fontSize: "10px",
        fontFamily: "sans-serif",
        fill: "#323F73",
        pointerEvents: "none",
      }}
      lengthAngle={360}
      lineWidth={30}
      onClick={() => console.log("Click on pie chart")}
      onMouseEnter={() => console.log("Mouse enter")}
      onMouseLeave={() => console.log("Mouse leave")}
      paddingAngle={0}
      radius={100}
      startAngle={0}
      viewBoxSize={[pieChartSize, pieChartSize]}
    />
  </ResponsiveContainer>
  {hoveredPie && (
    <div
      style={{
        marginTop: "10px",
        color: "#323F73",
        fontWeight: "bold",
      }}
    >
      {Math.round(progressAnimation.value)}%
    </div>
            )}
          </div>
        </div>
        {/* Display Task List */}
        <TaskTable
          tasks={tasks}
          projectId={projectId}
          teamMembers={teamMembers}
        />
      </div>
    </div>
  );
};

const ProjectVisualization = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [statisticsData, setStatisticsData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);


  localStorage.setItem("proId",projectId)
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
        console.log(data.data.project.Members);
        console.log(data.data.project.tasks);
        // setProjectDetails(data);
        setTasks(data.data.project.tasks);
        setTeamMembers(data.data.project.Members);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  useEffect(() => {
    // Fetch pie chart data from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the pie chart data using a GET request
    fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${projectId}/pieStats`, {
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
        // Convert the API response to an array of objects suitable for the Pie Chart
        const pieChartDataArray = [
          { title: "To Do", value: data.data.todo, color: "#ADD8E6" },
          {
            title: "In Progress",
            value: data.data.inProgress,
            color: "#F6E05E",
          },
          { title: "Completed", value: data.data.completed, color: "#32CD32" },
        ];

       

        setPieChartData(pieChartDataArray);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);



  useEffect(() => {
    // Fetch pie chart data from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the pie chart data using a GET request
    fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${projectId}/lineStats`, {
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
       

        const statisticsDataArray = [
          {
            name: `Week ${data.data.week}`,
            progress: data.data.todo,
            completedTasks: data.data.completed,
            remainingTasks: data.data.inProgress + data.data.todo,
          },
          {
            name: `Week ${data.data.week}`,
            progress: data.data.inProgress,
            completedTasks: data.data.completed,
            remainingTasks: data.data.inProgress + data.data.todo,
          },
          {
            name: `Week ${data.data.week}`,
            progress: data.data.completed,
            completedTasks: data.data.completed,
            remainingTasks: data.data.inProgress + data.data.todo,
          },
        ];

        setStatisticsData(statisticsDataArray);

      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  useEffect(() => {
    // Fetch project details based on the project ID (replace with your actual logic)

    const placeholderProjectDetails = {
      // progress: 60,
      // statisticsData: [
      //   { name: 'Week 0', progress: 10, completedTasks: 0, remainingTasks: 20 },
      //   { name: 'Week 1', progress: 20, completedTasks: 5, remainingTasks: 15 },
      //   { name: 'Week 2', progress: 50, completedTasks: 25, remainingTasks: 25 },
      //   // ... more data points
      // ]
    };
    setProjectDetails(placeholderProjectDetails);
  }, []);

  if (!projectDetails) {
    // Placeholder loading state
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Img
          className="h-[100px] w-[100px]"
          src="images/loading.gif"
          alt="Loading"
        />
      </div>
    );
  }


  const handleUpdateTaskList = (updatedTask, deleted = false) => {
    // Update the task list in the state based on the provided updated task
    setTasks((prevTasks) => {
      if (deleted) {
        // If the task was deleted, filter it out
        return prevTasks.filter((task) => task.id !== updatedTask.id);
      } else {
        // If the task was updated, replace it with the updated version
        return prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      }
    });
  };

  return (
    <div>
      {/* Render the progress component */}
      <ProjectStats
        projectId={projectId}
        handleCategoryChange={() => {}} // Placeholder functions, replace with your logic
        handleNavigate={() => {}}
        handleDeletionProject={() => {}}
        loading={false} // Placeholder loading state
        successPopupAnimation={{ opacity: 0, transform: "scale(0)" }} // Placeholder animation state
        statisticsData={statisticsData}
        pieChartSize={200}
        hovered={false} // Placeholder hover state
        pieChartData={pieChartData}
        tasks={tasks}
        teamMembers={teamMembers}
        updateTaskList={handleUpdateTaskList}
      />
    </div>
  );
};

export default ProjectVisualization;
