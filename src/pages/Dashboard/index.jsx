import React, { useState, useEffect } from 'react';
import { Img, Text } from 'components';
import { useNavigate } from 'react-router-dom';
import Navigation from 'pages/Sidebar';
import axios from 'axios';

const DashboardPage = () => {
  localStorage.removeItem("proId");
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showCreateProjects, setShowCreateProjects] = useState(false);
  const [showCreateTasks, setShowCreateTasks] = useState(false);
  const [popUp, setPopUp] = useState({ type: "", message: "" });

  let userrole=localStorage.getItem("role");
  let name = localStorage.getItem("username");

  useEffect(() => {
    let token = localStorage.getItem('token');
    const id = localStorage.getItem('userid');

    if (localStorage.getItem('role') === 'Team Member') {
      axios
        .get('https://projectflow-cgjn.onrender.com/api/v1/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setTasks(response.data.data.tasks);
          setPopUp({ type: 'success', message: 'Tasks loaded successfully!' });
        })
        .catch((error) => {
          setPopUp({ type: 'error' });
          console.error('Error loading tasks:', error);
        });
    } else if (localStorage.getItem('role') === 'Project Manager') {
      axios
        .get(`https://projectflow-cgjn.onrender.com/api/v1/users/${id}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setTasks(response.data.data.tasks);
          setPopUp({ type: 'success', message: 'Tasks loaded successfully!' });
        })
        .catch((error) => {
          setPopUp({ type: 'error' });
          console.error('Error loading tasks:', error);
        });
    }

    const role = localStorage.getItem("role");
    let fetchProjectsUrl = "";

    if (role === "Team Member" || role === "Client") {
      fetchProjectsUrl = "https://projectflow-cgjn.onrender.com/api/v1/projects";
    } else if (role === "Project Manager") {
      fetchProjectsUrl = `https://projectflow-cgjn.onrender.com/api/v1/users/${id}/projects`;
    }
   

    axios
      .get(fetchProjectsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const apiProjects = response.data.data.projects;
        const mappedProjects = apiProjects.map((project) => ({
          id: project._id,
          name: project.name,
          dueDate: project.end_date,
        }));
        setProjects(mappedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []); // Empty dependency array to run once on mount

  const handleCreateProjectClick = () => {
    navigate('/newproject');
  };

  const handleCreateTaskClick = () => {
    // Replace 'dummy' with the actual project ID or fetch it from your state
    navigate("/newtask");
  };
  let token = localStorage.getItem("token");
  const handleLogout = async () => {
  
    fetch("https://projectflow-cgjn.onrender.com/api/v1/users/logout", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        setPopUp({ type: "success" });
        navigate("/signin");
      })
      .catch((error) => {
        setPopUp({ type: "error" });
        console.error("Error logging in", error);
    });
  }

  return (
    <div>
      <Navigation />

      <div style={{ width: '73%', padding: '20px', marginLeft: '350px' }}>
        <div className="flex justify-end space-x-8 mr-10">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate('/myprofile')}
          style={{
            marginLeft:'80%',
            fontSize: '16px',
            textAlign: 'left',
            color: '#1F2544',
            marginTop: '50px',
          }}
        >
          My Profile
        </Text>
        <Text
              className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
              size="txtPoppinsRegular16"
              onClick={handleLogout}
              style={{ fontSize: '18px', cursor: 'pointer',color: '#1F2544', fontSize: '16px',
                marginTop: '50px', }}
        >
            
              Logout
            </Text>
            </div>

        <div className="flex sm:flex-col flex-row gap-[58px] items-center justify-center md:ml-[0] ml-[139px] mt-2 w-[54%] md:w-full">
  <div className="w-[36%] sm:w-[36%]">
    <Img className="h-[148px] md:h-auto object-cover w-full rounded-lg shadow-lg" src="images/welcome.gif" alt="welcome" />
  </div>
  <div style={{color: '#1F2544', textshadow: "2px 2px 4px rgba(0, 0, 0, 0.1);" }} className="text-center w-[64%] sm:w-[64%]">
    <Text className="text-3xl md:text-4xl text-custom-color font-bold mb-4">Welcome, {name}</Text>
    <p className="text-lg md:text-xl text-custom-color-light">Your journey starts here. Let's make great things happen together!</p>
  </div>
</div>
        <div style={{ display: 'flex', marginTop: '49px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Text style={{ fontSize: '22px', color: '#1F2544', marginRight: '10px' }} size="txtPoppinsBold22">
                My Projects
              </Text>
             {userrole==="Project Manager"  && (
              <button
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#1F2544' }}
                onClick={handleCreateProjectClick}
              >
                +
              </button>
              )}
              </div>
              {!showCreateProjects && (
                <table style={{ width: '100%', marginTop: '10px', border: '1px solid #EBD9B4', borderRadius: '12px', overflow: 'hidden' , boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <thead style={{ backgroundColor: '#EBD9B4' }}>
                    <tr>
                      <th style={{ padding: '8px' }}>#</th>
                      <th style={{ padding: '8px' }}>Name</th>
                      <th style={{ padding: '8px' }}>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr key={project.id}>
                        <td style={{ padding: '8px', border: '1px solid #EBD9B4', backgroundColor: '#F7F1E5' }}>{index + 1}</td>
                        <td style={{ padding: '8px', border: '1px solid #EBD9B4', backgroundColor: '#F7F1E5' }}>{project.name}</td>
                        <td style={{ padding: '8px', border: '1px solid #EBD9B4', backgroundColor: '#F7F1E5' }}>{project.dueDate.substring(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div style={{ flex: '1', marginLeft: '10px' }}>

  {userrole !=="Client" &&(          
  <div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
  <Text style={{ fontSize: '22px', color: '#1F2544', marginRight: '10px' }} size="txtPoppinsBold22">
    My Tasks
  </Text>
  {userrole==="Project Manager"  && (
  <button
    style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#1F2544' }}
    onClick={handleCreateTaskClick}
  >
    +
  </button>
  )}
</div>

        {!showCreateTasks && (
          <table style={{ width: '100%', marginTop: '10px', border: '1px solid #EBD9B4', borderRadius: '12px', overflow: 'hidden' , boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <thead style={{ backgroundColor: '#EBD9B4' }}>
              <tr>
                <th style={{ padding: '8px' }}>#</th>
                <th style={{ padding: '8px' }}>Task Name</th>
                <th style={{ padding: '8px' }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td style={{ padding: '8px', border: '1px solid #EBD9B4', backgroundColor: '#F7F1E5' }}>{index + 1}</td>
                  <td style={{ padding: '8px', border: '1px solid #EBD9B4', backgroundColor: '#F7F1E5' }}>{task.name}</td>
                  <td style={{ padding: '8px', border: '1px solid #EBD9B4', backgroundColor: '#F7F1E5' }}>{task.end_date.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
  )}
    </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
