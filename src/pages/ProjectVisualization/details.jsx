import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Text, Button } from '../../components';
import Navigation from '../../pages/Sidebar';

const ProjectProgress = ({ progress, statisticsData, tasks }) => {
  const [projectname, setProjectname] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  let userrole=localStorage.getItem("role")
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        setProjectname(data.data.project.name);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  useEffect(() => {
    // Extract the pathname from the location
    const { pathname } = location;
    // Check if any of the menu items match the current pathname
    if (pathname.includes('/details')) {
      setActiveItem(`/details/${projectId}`);
    } else if (pathname.includes('/kanban')) {
      setActiveItem(`/kanban/${projectId}`);
    } else if (pathname.includes('/calendar')) {
      setActiveItem(`/calendar/${projectId}`);
    } else if (pathname.includes('/ganttchart')) {
      setActiveItem(`/ganttchart/${projectId}`);
    } else {
      setActiveItem(null);
    }
  }, [location, projectId]);

  const navigateTo = (path) => () => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navigation />
      <div style={{ width: '73%', padding: '20px', marginLeft: '350px' }}>
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
          size="txtPoppinsRegular16"
          onClick={navigateTo('/myprofile')}
        >
          My Profile
        </Text>
        <Text
          className="mt-[95px] ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800"
          size="txtPoppinsBold34"
        >
          {projectname}
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '50px' }}>
        {userrole==="Project Manager"  && (
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px' }}
            onClick={navigateTo(`/updateproject/${projectId}`)}
            shape="round"
            color="indigo_800_01"
          >
            Settings
          </Button>
        )}

{/* {userrole==="Project Manager"  && (
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px', backgroundColor: '#BE3144', color: '#ffffff' }}
            onClick={navigateTo(`/updateproject/${projectId}`)}
            shape="round"
          >
            Delete
          </Button>

)} */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', cursor: 'pointer' }}>
          <h3
            onClick={navigateTo(`/details/${projectId}`)}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              borderBottom: activeItem === `/details/${projectId}` ? '3px solid #323F73' : '3px solid transparent',
              fontWeight: activeItem === `/details/${projectId}` ? 'bold' : 'normal',
              color: '#323F73',
              cursor: 'pointer',
            }}
          >
            Statistics
          </h3>
          <h3
            onClick={navigateTo(`/kanban/${projectId}`)}
            style={{
              margin: '0 70px',
              padding: '10px 20px',
              borderBottom: activeItem === `/kanban/${projectId}` ? '3px solid #323F73' : '3px solid transparent',
              fontWeight: activeItem === `/kanban/${projectId}` ? 'bold' : 'normal',
              color: '#323F73',
              cursor: 'pointer',
            }}
          >
            Kanban View
          </h3>
          <h3
            onClick={navigateTo(`/calendar/${projectId}`)}
            style={{
              margin: '0 60px',
              padding: '10px 20px',
              borderBottom: activeItem === `/calendar/${projectId}` ? '3px solid #323F73' : '3px solid transparent',
              fontWeight: activeItem === `/calendar/${projectId}` ? 'bold' : 'normal',
              color: '#323F73',
              cursor: 'pointer',
            }}
          >
            Calendar View
          </h3>
          <h3
            onClick={navigateTo(`/ganttchart/${projectId}`)}
            style={{
              margin: '0 40px',
              padding: '10px 20px',
              borderBottom: activeItem === `/ganttchart/${projectId}` ? '3px solid #323F73' : '3px solid transparent',
              fontWeight: activeItem === `/ganttchart/${projectId}` ? 'bold' : 'normal',
              color: '#323F73',
              cursor: 'pointer',
            }}
          >
            Gantt View
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
