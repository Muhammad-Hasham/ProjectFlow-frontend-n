import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Button } from "components";
import Navigation from '../../pages/Sidebar';
import { useSpring, animated } from 'react-spring';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField } from '@mui/material';


const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [projectname, setProjectname] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // State for the editable due date
  const [startDate, setStartDate] = useState("");

  const [popUp, setPopUp] = useState({
    type: null, // 'success' or 'error'
  });

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
    pointerEvents: popUp.type ? 'auto' : 'none',
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

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
        console.log(data);
        setProject(data);

        // Set the initial value of the editable due date from the fetched data
        setDueDate(data.data.project.end_date);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const handleDeleteProject = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const token = localStorage.getItem("token");
      fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            navigate("/myprojects");
          } else {
            throw new Error("Project deletion failed");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleUpdateProject = () => {
    const token = localStorage.getItem("token");
    const updateData = {
      name: projectname,
      end_date: dueDate, // Use the state variable for the editable due date
      description: description,
      start_date: startDate
    };

    fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Project Updated Successfully")
          navigate("/myprojects");
        } else {
          throw new Error("Project update failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  if (!project) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar */}
      <Navigation />
      {/* New Project Form */}
      <div  style={{ width: '73%', padding: '20px', marginLeft: '300px' }}>
        <Text 
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate('/myprofile')}
        >
          My Profile
        </Text>
        <Text
           style={{ 
            marginLeft: '50px',
            fontSize: '3xl', // Adjust this value as needed for different screen sizes
            '@media (min-width: 640px)': {
              fontSize: '3xl'
            },
            '@media (min-width: 768px)': {
              fontSize: '3px'
            },
            fontSize: '34px',
            textAlign: 'left',
            color: '#1F2544',
            display: 'flex',
            alignItems: 'center',
            marginTop: '70px',
            }}
          size="txtPoppinsBold34"
        >
          Project Details
        </Text>
        <div style={{ marginLeft: '45px', backgroundColor: '#F7F1E5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', padding: '39px', paddingLeft: '5px', paddingRight: '5px', borderRadius: '30px',width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
          <div className="flex flex-col items-start justify-start mt-[-15px] w-[95%] md:w-full">
            {/* Project Name */}
            <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mt-[34px] w-[97%] md:w-full">
  <Text style={{
      color: '#1F2544',
      letterSpacing: '0.44px',
      marginBottom: '0.25rem', // Adjusted margin to align with TextField
  }} size="txtPoppinsRegular16">
      Project Name
  </Text>
  <div style={{
      fontSize: '1rem',
      width: '70%',
  }}>
      <TextField
          type="text"
          name="projectName"
          placeholder={project.data.project.name}
          value={projectname}
          onChange={(e) => setProjectname(e.target.value)}
          style={{
              fontSize: '1rem',
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
          }}
      />
  </div>
</div>


      {/* Start Date and Due Date */}
<div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
  <Text style={{
      color: '#1F2544',
      letterSpacing: '0.44px',
  }}
  size="txtPoppinsRegular16">
      Start Date
  </Text>
  <animated.div style={fadeIn}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="start-date-picker"
             name="startDate"
             value={startDate ? startDate.substring(0, 10) : ""}
             onChange={(e) => setStartDate(e.target.value)}
              style={{ display: 'none' }} // Hide the DatePicker
          />
      </LocalizationProvider>
  </animated.div>
</div>

<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
  <Text style={{
      color: '#1F2544',
      letterSpacing: '0.44px',
      marginRight: 'auto', // Adjusted to push due date to the right
  }}
  size="txtPoppinsRegular16">
      Due Date
  </Text>
  <animated.div style={fadeIn}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
              id="due-date-picker"
              name="DueDate"
              value={dueDate ? dueDate.substring(0, 10) : ""}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ display: 'none' }} // Hide the DatePicker
          />
      </LocalizationProvider>
  </animated.div>
</div>

</div>


            {/* Description */}
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-9 w-[97%] md:w-full">
              <Text style={{
                color: '#1F2544',
                letterSpacing: '0.44px',
              }} size="txtPoppinsRegular16">
                Description
              </Text>
              <div style={{
                
                fontSize: '1rem', // Font size for text-base
                width: '70%', // Width as specified
              }}>
                <TextField
                  type="text"
                  name="description"
                  placeholder={project.data.project.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    fontSize: '1rem', // Equivalent to text-base
                    width: '100%', // Equivalent to w-full
                    backgroundColor: 'transparent', // Equivalent to bg-gray-50
                    border: 'none', // Equivalent to border-none
                    borderBottom: '0.5px #1F2544', // Border color for indigo-800
                    outline: 'none', // Equivalent to focus:outline-none
                  }}
                />
              </div>
            </div>

            {/* Button to Invite */}
            <Button
              className="cursor-pointer leading-[normal] min-w-[84px] ml-[635px] mt-[63px] text-base text-center tracking-[0.44px] shake-on-hover"
              shape="round"
              style={{ backgroundColor: "#860A35", color: "#ffffff" }}
              onClick={handleUpdateProject}
            >
              Update
            </Button>


            {/* Button to Create Project */}
            <Button
              className="cursor-pointer leading-[normal] min-w-[84px] ml-[745px] mt-[-42px] text-base text-center tracking-[0.44px]"
              shape="round"
              color="indigo_800"
              onClick={handleDeleteProject}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>

    <animated.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: popUpAnimation.transform,
        opacity: popUpAnimation.opacity,
        background: popUp.type === 'success' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      {popUp.type === 'success'
        ? 'Project Created Successfully!'
        : 'Project Creation Failed. Please try again.'}
    </animated.div>
  </>
  );
};

export default ProjectDetailsPage;
