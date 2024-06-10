import React, { useState, useEffect } from 'react';
import { Button, Text } from '../../components';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Sidebar';
import { useSpring, animated } from 'react-spring';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField } from '@mui/material';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    startDate: null,
    dueDate: null,
    description: '',
  });

  const [popUp, setPopUp] = useState({
    type: null, // 'success' or 'error'
  });

  const handleDueDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProject = () => {
    if (!formData.projectName || !formData.description || !formData.dueDate) {
      console.error('Please fill out all required fields.');
      setPopUp({ type: 'error' });
      return;
    }

    

    const projectData = {
      name: formData.projectName,
      end_date: formData.dueDate,
      description: formData.description,
    };

    let token = localStorage.getItem('token');

    fetch('https://projectflow-cgjn.onrender.com/api/v1/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPopUp({ type: 'success' });
        navigate('/myprojects');
      })
      .catch((error) => {
        setPopUp({ type: 'error' });
        console.error('Project creation failed', error);
      });
  };

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
    pointerEvents: popUp.type ? 'auto' : 'none',
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  useEffect(() => {
    // Set a timer to clear the pop-up after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setPopUp({ type: null });
    }, 3000);

    // Clear the timer when the component unmounts or when popUp.type changes
    return () => clearTimeout(timer);
  }, [popUp.type]);

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
            New Project
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
            inputProps={{ "data-testid": "name" }}
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
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
                value={formData.startDate}
                onChange={handleStartDateChange}
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
                value={formData.dueDate}
                onChange={handleDueDateChange}
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
                    name="description"
                    inputProps={{ "data-testid": "description" }}
                    value={formData.description}
                    onChange={handleInputChange}
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
                onClick={() => navigate('/invite', { state: formData })}
              >
                Invite
              </Button>


              {/* Button to Create Project */}
              <Button
                className="cursor-pointer leading-[normal] min-w-[84px] ml-[745px] mt-[-42px] text-base text-center tracking-[0.44px]"
                shape="round"
                color="indigo_800"
                onClick={handleCreateProject}
              >
                Create
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

export default NewProjectPage;
