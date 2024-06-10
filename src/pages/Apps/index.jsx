import React, { useState } from 'react';
import { Button, Img, Text } from 'components';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Navigation from 'pages/Sidebar';
import axios from 'axios';

const AppsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [creatingMeeting, setCreatingMeeting] = useState(false);

  const handleAddButtonClick = () => {
    
    setLoading(true);
    // Simulate asynchronous operation (API call, etc.)
    setTimeout(() => {
      setLoading(false);
      setShowSuccessPopup(true);

      // Reset success message after a few seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }, 2000);
    navigate('/googledocs')
  };

  const zoomMeeting = () => {
    setCreatingMeeting(true); // Set loading state to true
  
    const data = {
      email: 'i200752@nu.edu.pk',
    };
  
    axios
      .post('https://projectflow-zoombackend.onrender.com/meeting', data)
      .then((res) => {
        console.log(res.data);
        let URL = res.data.join_url.replace(
          'https://us05web.zoom.us/j/',
          'http://127.0.0.1:9999/?'
        );
        console.log(URL);
        window.location.replace(URL);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCreatingMeeting(false); // Set loading state back to false
      });
  };

  const successPopupAnimation = useSpring({
    opacity: showSuccessPopup ? 1 : 0,
    transform: `scale(${showSuccessPopup ? 1 : 0.5})`,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* Sidebar */}
        <Navigation/>

        {/* Main Content */}
        <div style={{ width: '73%', padding: '20px', marginLeft: '300px' }}>
          <Text
            className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
            onClick={() => navigate('/myprofile')}
            style={{ fontSize: '18px', cursor: 'pointer' }}
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
            Applications
          </Text>
          <div className="flex flex-col items-center justify-start ml-10 md:ml-[0] mr-[29px] mt-12 w-[93%] md:w-full">
            <div className="md:gap-5 gap-[53px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
              {/* Repeat this block for each application */}
              <div className="flex flex-1 flex-col items-center justify-start w-full">
                <div
                  className=" bg-cover bg-no-repeat flex flex-col h-[293px] items-center justify-end p-[31px] sm:px-5 w-full"
                  style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', backgroundColor: '#F7F1E5', borderRadius: '30px',}}
                >
                  <div className="flex flex-col justify-start mt-[130px] ml-[0px] w-[97%] md:w-full">
                    <div className="flex flex-row gap-[34px] items-center justify-start w-[86%] md:w-full">
                      <div className="flex flex-col items-center justify-start w-[33%]">
                        <div className=" flex flex-col items-center justify-start p-[7px] rounded-[15px] w-full">
                          <Img
                            className="h-[57px]  object-cover w-[57px] mt-[100px]"
                            style = {{borderRadius: '30px'}}
                            src="images/zoom.png"
                            alt="imageThirteen"
                          />
                        </div>
                      </div>
                      <Text
                        className="text-base tracking-[0.44px] mt-[100px]"
                        size="txtPoppinsBold16"
                        style = {{fontSize: '24px', color: '#1F2544',}}
                      >
                        Zoom
                      </Text>
                    </div>
                    <Text
                      className="md:ml-[0] mt-[30px] mx-4 text-base text-indigo-800 tracking-[0.44px] w-[90%] sm:w-full"
                      size="txtPoppinsRegular16"
                    >
                      A popular video conferencing platform for virtual meetings and collaboration.
                    </Text>
                    <Button
                      className="cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[218px] mt-[18px] text-base text-center tracking-[0.44px] relative" // Add relative positioning to the button
                      shape="round"
                      style={{ backgroundColor: '#1F2544', color: 'white', borderRadius: '30px', position: 'relative' }} // Add relative positioning to the button
                      onClick={zoomMeeting}
                      disabled={creatingMeeting} // Disable the button while creating the meeting
                    >
                      {creatingMeeting ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <Img
                            className="h-[30px] w-[30px] animate-spin"
                            src="images/loading.gif"
                            alt="Loading"
                          />
                        </div>
                      ) : (
                        'Create Meeting'
                      )}
                    </Button>
                     {/* Loading Animation */}
                     {loading && (
                      <div style={{ 
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust opacity as needed
                      }}>
                        <Img
                          className="h-[100px] w-[100px]"
                          src="images/loading.gif"
                          alt="Loading"
                        />
                      </div>
                    )}
                      {/* Success Popup
                      <animated.div style={successPopupAnimation} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md">
                        Application added successfully!
                      </animated.div> */}
                  </div>
                </div>
              </div>
              {/* End of application block */}

              <div className="flex flex-1 flex-col items-center justify-start w-full">
                <div
                  className=" bg-cover bg-no-repeat flex flex-col h-[293px] items-center justify-end p-[31px] sm:px-5 w-full"
                  style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', backgroundColor: '#F7F1E5', borderRadius: '30px',}}
                >
                  <div className="flex flex-col justify-start mt-[130px] ml-[0px] w-[97%] md:w-full">
                    <div className="flex flex-row gap-[34px] items-center justify-start w-[86%] md:w-full">
                      <div className="flex flex-col items-center justify-start w-[33%]">
                        <div className=" flex flex-col items-center justify-start p-[7px] rounded-[15px] w-full">
                          <Img
                            className="h-[57px]  object-cover w-[57px] mt-[100px]"
                            style = {{borderRadius: '30px'}}
                            src="https://www.gstatic.com/images/icons/material/product/2x/docs_48dp.png"
                            alt="imageThirteen"
                          />
                        </div>
                      </div>
                      <Text
                        className="text-base tracking-[0.44px] mt-[100px]"
                        size="txtPoppinsBold16"
                        style = {{fontSize: '24px', color: '#1F2544',}}
                      >
                        Google Docs
                      </Text>
                    </div>
                    <Text
                      className="md:ml-[0] mt-[30px] mx-4 text-base text-indigo-800 tracking-[0.44px] w-[90%] sm:w-full"
                      size="txtPoppinsRegular16"
                    >
                      Cloud-based document creation and collaboration tool enabling real-time editing and sharing.
                    </Text>
                    <Button
                      className="cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[218px] mt-[18px] text-base text-center tracking-[0.44px]"
                      shape="round"
                      style = {{backgroundColor: '#1F2544', color: 'white', borderRadius: '30px'}}
                      onClick={handleAddButtonClick}
                    >
                      Create a new doc
                    </Button>
                     {/* Loading Animation */}
                     {loading && (
                      <div style={{ 
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust opacity as needed
                      }}>
                        <Img
                          className="h-[100px] w-[100px]"
                          src="images/loading.gif"
                          alt="Loading"
                        />
                      </div>
                    )}
                      {/* Success Popup
                      <animated.div style={successPopupAnimation} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md">
                        Application added successfully!
                      </animated.div> */}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  );
};

export default AppsPage;
