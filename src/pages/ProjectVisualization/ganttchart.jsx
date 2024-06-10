import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import ProjectProgress from './details';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const GanttComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('Gantt Chart');
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [task, setTask] = useState([]);

  const isLaptop = useMediaQuery({ minWidth: 1024 });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNavigate = () => {
    console.log(`Navigate to ${selectedCategory} view`);
  };

  const handleDeletionProject = () => {
    console.log(`Delete project in ${selectedCategory} view`);
  };

  const handleEventClick = (event) => {
    console.log(`Clicked on event: ${event.title}`);
  };

  useEffect(() => {
    // Fetch data from the API
    const token = localStorage.getItem("token");

    fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        // Map API data to Gantt chart format
        const tasks = data.data.project.tasks; // Array of tasks

        const columns = [
            { type: "string", label: "Task ID" },
            { type: "string", label: "Task Name" },
            { type: "string", label: "Description" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" },
            { type: "number", label: "Priority" },
            { type: "number", label: "Status" },
            { type: "string", label: "Pre Dependency" },
            { type: "string", label: "Post Dependency" }
        ];

        const rows = tasks.map(task => [
            task.id,
            task.name,
            task.description,
            new Date(task.start_date),
            new Date(task.end_date),
            task.priority,
            task.status,
            task.pre_dependency,
            task.post_dependency
        ]);

        const ganttData = [columns, ...rows];

        setTask(ganttData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}, [projectId]);


  const options = {
    height: 1000, // Reduced height to make the chart smaller
    gantt: {
      defaultStartDateMillis: new Date(2024, 3, 28),
      criticalPathEnabled: true,
      criticalPathStyle: {
        stroke: "#e64a19",
        strokeWidth: 4,
      },
      innerGridTrack: { fill: "#fff3e0" },
      innerGridDarkTrack: { fill: "#ffcc80" },
      palette: [
        { color: '#d9534f' }, // Red for high priority
        { color: '#f0ad4e' }, // Orange for medium priority
        { color: '#5cb85c' }, // Green for low priority
      ]
    },
  };

  return (
    <div>
      <ProjectProgress
        handleCategoryChange={handleCategoryChange}
        handleNavigate={handleNavigate}
        handleDeletionProject={handleDeletionProject}
        tasks={task}
      />
      <Chart
        className="gantt-chart"
        chartType="Gantt"
        width="85%"
        height="100%" 
        data={task}
        options={options}
      />
      {isLaptop && (
        <style>
          {`
            .gantt-chart {
              margin-top: -30%;
              margin-left: 30%;
            }
          `}
        </style>
      )}
    </div>
  );
};

export default GanttComponent;
