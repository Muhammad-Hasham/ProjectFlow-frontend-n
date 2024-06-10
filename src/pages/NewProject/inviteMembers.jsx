import React, { useState, useEffect } from 'react';
import { Button, Text } from 'components';
import { useNavigate,useLocation } from 'react-router-dom';
import Navigation from 'pages/Sidebar';
import { useSpring, animated } from 'react-spring';

const InviteMembers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ProjectData = location.state;

  const [formData, setFormData] = useState({
  
    emailAddresses: [''], // Initial email field
  });

  const [popUp, setPopUp] = useState({
    type: null, // 'inviteSuccess' or 'projectSuccess' or 'error'
  });

  const [showInviteModal, setShowInviteModal] = useState(false);

 
  let projectId=localStorage.getItem("proId")

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEmails = [...formData.emailAddresses];
    updatedEmails[index] = value;
    setFormData({ ...formData, emailAddresses: updatedEmails });
  };

  const handleAddEmailField = () => {
    setFormData((prevFormData) => {
      const newEmailAddresses = [...prevFormData.emailAddresses, ''];
      return { ...prevFormData, emailAddresses: newEmailAddresses };
    });
  };

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem('token');
      let emailData = {
        emails: formData.emailAddresses,
      };
      
      if (projectId) {
        // Update the emailData object with projectId
        emailData.projectId = projectId;
      }
      
      // Now you can use the emailData object as needed
      
      const response = await fetch('https://projectflow-cgjn.onrender.com/api/v1/projects/sendinvite', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        console.log('Invite emails sent successfully:', data);

        if(projectId)
        {
          navigate(`/details/${projectId}`)
        }
        setPopUp({ type: 'inviteSuccess' });
        setShowInviteModal(false);
      } else {
        console.error('Failed to send invite emails:', data);
        setPopUp({ type: 'error' });
      }
    } catch (error) {
      // console.error('Error sending invite emails:', error);
      // setPopUp({ type: 'error' });
    }
  };
  


  const handleCreateProject = () => {
    if (!ProjectData.projectName || !ProjectData.description || !ProjectData.dueDate) {
      console.error('Please fill out all required fields.');
      setPopUp({ type: 'error' });
      return;
    }

    const projectData = {
      name:ProjectData.projectName,
      end_date: ProjectData.dueDate,
      description: ProjectData.description,
      member: formData.emailAddresses
    };

    let token = localStorage.getItem('token');
    console.log(projectData)

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
        setPopUp({ type: 'projectSuccess' });
        navigate('/myprojects');
      })
      .catch((error) => {
        // setPopUp({ type: 'error' });
        // console.error('Project creation failed', error);
      });
  };

  const renderEmailFields = () => {
    return (
      <div  className="flex flex-col items-end justify-between mt-[34px] w-[97%] md:w-full">
        {formData.emailAddresses.map((email, index) => (
          <div key={index} className="flex flex-col ml-4 mt-4">
            {/* Email Label */}
            <Text style={{ fontSize: "16px", fontFamily: "Poppins", color: "#323F73" }}>
              Email Address
            </Text>
            <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderBottom: '1px solid #323F73', backgroundColor: '#F8FAFC', fontSize: '1rem', width: '76%' }}>
              <input
                type="text"
                name={`emailAddress-${index}`}
                value={email}
                onChange={(e) => handleInputChange(e, index)}
                className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
    pointerEvents: popUp.type ? 'auto' : 'none',
  });

  useEffect(() => {
    // Set a timer to clear the pop-up after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setPopUp({ type: null });
    }, 3000);

    // Clear the timer when the component unmounts or when popUp.type changes
    return () => clearTimeout(timer);
  }, [popUp.type]);

  const containerStyle = {
    backgroundColor: '#F7F1E5',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginLeft: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '10px',
    padding: '39px',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderRadius: '30px',
    width: '100%'
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* Sidebar */}
        <Navigation />
        {/* New Project Form */}
        <div style={{ width: '73%', padding: '20px', marginLeft: '320px' }}>
          <Text
            className="md:ml-[0] ml-[849px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
            onClick={() => navigate('/myprofile')}
          >
            My Profile
          </Text>
          {/* '+' Button to Add Email Field */}
      

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
            Invite Members
          </Text>
          

          <div style ={containerStyle}>
            <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
               {/* '+' Button to Add Email Field */}
               <Button
                style={{
                  cursor: "pointer",
                  minWidth: "40px",
                  marginLeft: "760px",
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
                onClick={handleAddEmailField}
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
             <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">             
                {/* Image on the left side */}
                <img src="images/team.png" alt="Email Icon" style={{ width: '50%', marginRight: '8px' }} />
                {/* Email Input Fields */}
                {renderEmailFields()}                
              </div>             
              {/* Invite Button */}
              <Button
                className="cursor-pointer leading-[normal] min-w-[28px] ml-[635px] mt-[20px] text-base text-center tracking-[0.44px]"
                shape="round"
                style={{ backgroundColor: "#860A35", color: "#ffffff" }}
                onClick={handleInvite}
              >
                Invite
              </Button>

             
{ProjectData && ProjectData.name !== null && (
  <Button
    className="cursor-pointer leading-[normal] min-w-[84px] ml-[745px] mt-[-42px] text-base text-center tracking-[0.44px]"
    shape="round"
    color="indigo_800"
    onClick={handleCreateProject}
  >
    Create
  </Button>
)}


            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="invite-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowInviteModal(false)}>
              &times;
            </span>
            <p>Invite has been sent!</p>
          </div>
        </div>
      )}

      {/* Pop-up */}
      <animated.div
        style={{
          ...popUpAnimation,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: popUpAnimation.opacity.interpolate((opacity) => `translate(-50%, -50%) scale(${opacity})`),
          background: popUp.type === 'inviteSuccess' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <p>
          {popUp.type === 'inviteSuccess' ? 'Invite Sent Successfully!' : 'Project Creation Failed. Please try again.'}
        </p>
      </animated.div>
    </>
  );
};

export default InviteMembers;
