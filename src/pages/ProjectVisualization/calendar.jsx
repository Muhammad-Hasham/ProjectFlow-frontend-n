import React, { useEffect, useState } from 'react';
import { Text, Button } from 'components';
import Navigation from 'pages/Sidebar';
import ProjectProgress from './details';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({
  loading,
  successPopupAnimation,
  statisticsData,
  pieChartSize,
  hovered,
  pieChartData,
  tasks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Calendar');
  const navigate = useNavigate();

    const {projectId}=useParams();

    const [task, setTask] = useState([]);

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
       
        setTask(data.data.project.tasks);
       
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const events = task.map((task) => ({
    id: task.id,
    title: task.name,
    start: new Date(task.start_date),
    end: new Date(task.end_date),
  }));

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

  return (
    <div>
      <ProjectProgress
        handleCategoryChange={handleCategoryChange}
        handleNavigate={handleNavigate}
        handleDeletionProject={handleDeletionProject}
        loading={loading}
        successPopupAnimation={successPopupAnimation}
        statisticsData={statisticsData}
        pieChartSize={pieChartSize}
        hovered={hovered}
        pieChartData={pieChartData}
        tasks={tasks}
      />
      <div>
      <div style={{ marginTop: '-320px', marginRight: "80px", marginLeft: '350px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
  <h3 style={{ color: '#323F73', marginBottom: '20px', textAlign: 'center', fontSize: '24px' }}>Calendar View</h3>
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    onSelectEvent={handleEventClick}
    eventPropGetter={(event, start, end, isSelected) => {
      const backgroundColor = isSelected ? '#2E86C1' : '#F4D03F'; // Blue for selected, Yellow for unselected
      const borderColor = isSelected ? '#2E86C1' : '#F4D03F';
      return { style: { backgroundColor, borderColor, color: '#fff', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' } };
    }}
    eventStyle={{ borderRadius: '8px', border: 'none' }}
    dayPropGetter={(date) => {
      return {
        style: {
          backgroundColor: date.getDay() === 0 || date.getDay() === 6 ? '#f2f2f2' : '#fff', // Light gray for weekends
          borderRadius: '8px',
        }
      };
    }}
  />
</div>


      </div>
    </div>
  );
};

export default CalendarComponent;