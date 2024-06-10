import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Text } from "components";
import Navigation from "pages/Sidebar";

const MyProjectsPage = () => {
  const navigate = useNavigate();
  localStorage.removeItem("proId")
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);

  const handleAddButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
 let userrole=localStorage.getItem("role");
  useEffect(() => {
    const id = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem('role');
    
    const fetchProjects = async () => {
      try {
        let endpoint = `https://projectflow-cgjn.onrender.com/api/v1/projects`;

        if (role === 'Project Manager') {
          endpoint = `https://projectflow-cgjn.onrender.com/api/v1/users/${id}/projects`;
        }

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const apiProjects = data.data.projects;

        const mappedProjects = apiProjects.map((project) => ({
          id: project._id,
          title: project.name,
          dueDate: project.end_date,
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const dummyProjects = [
    {
      id: '1',
      title: 'Project 1',
      dueDate: '2023-12-01',
    },
    {
      id: '2',
      title: 'Project 2',
      dueDate: '2023-12-15',
    },
    // Add more dummy projects as needed
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Navigation />
      <div style={{ width: '73%', padding: '20px', marginLeft: '300px' }}>
        <Text
          className="text-base text-indigo-800 cursor-pointer"
          onClick={() => navigate('/myprofile')}
          style={{ fontSize: '18px', marginLeft: '800px' }}
        >
          My Profile
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '92%', marginLeft: '3px' }}>
            <Text
              style={{ fontSize: '34px', color: '#1F2544', marginTop: '70px', fontFamily: 'Poppins', fontWeight: '600', letterSpacing: '0.44px'}}
            >
              Projects
            </Text>
            {userrole==="Project Manager"  && (
            <Button
              style={{ cursor: 'pointer', minWidth: '109px', marginTop: '70px', fontSize: '16px', letterSpacing: '0.44px', transition: 'transform 0.2s ease-in-out', transform: hovered === '/newproject' ? 'scale(1.1)' : 'scale(1)' }}
              onClick={() => {
                handleAddButtonClick();
                navigate("/newproject");
              }}
              shape="round"
              color="indigo_800_01"
            >
              Create
            </Button>
            )}
            {loading && (
              <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Img
                  style={{ height: '100px', width: '100px' }}
                  src="images/loading.gif"
                  alt="Loading"
                />
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
            {(projects.length > 0 ? projects : dummyProjects).map((project) => (
              <div
                key={project.id}
                style={{ cursor: 'pointer', backgroundColor: '#F7F1E5', width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '7px', borderRadius: '30px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out', transform: hovered === project.id ? 'scale(1.1)' : 'scale(1)' }}
                onClick={() => navigate(`/details/${project.id}`)}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '31px', borderRadius: '15px', height: '120px', width: '100%' }}>
                  <Img
                    style={{ height: 'auto', maxHeight: '100%', objectFit: 'contain', width: '100%' }}
                    src="images/work.png"
                    alt="Project Image"
                  />
                </div>
                <Text style={{ color: '#1F2544', marginTop: '20px', marginBottom: '10px', letterSpacing: '0.44px', fontSize: '16px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                  {project.title}
                </Text>
                <Text style={{ color: '#1F2544', marginTop: '10px', marginBottom: '15px', letterSpacing: '0.44px', fontSize: '16px' }}>
                  Due {project.dueDate ? project.dueDate.substring(0, 10) : ""}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;
