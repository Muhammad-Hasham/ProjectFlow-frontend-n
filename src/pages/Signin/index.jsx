import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { Button, Text } from '../../components';


const SigninPage = () => {
  localStorage.clear();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      // Send a POST request to your backend's login endpoint
      const response = await axios.post("https://projectflow-cgjn.onrender.com/api/v1/users/login", formData);

      // Assuming that your backend returns a token upon successful login, you can save it in localStorage
      localStorage.setItem("token", response.data.token);
      // Redirect to the dashboard or any other page upon successful login
      
      localStorage.setItem("userid",response.data.data.user._id)
      localStorage.setItem("username",response.data.data.user.name)
      localStorage.setItem("email",response.data.data.user.email)
      localStorage.setItem("photo",response.data.data.user.photo)
      localStorage.setItem("role",response.data.data.user.role)
      alert("LoggedIn Successfully")
      if(response.data.data.user.role==="admin")
      {
        navigate("/logs");
      }
      else
      {
      navigate("/dashboard");
      }
      
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error, e.g., show an error message to the user
    }
  }

  return (
    <>

      <div className="bg-white-A700 font-poppins h-[1024px] mx-auto md:pl-10 sm:pl-5 pl-[94px] relative w-full">
      <div
  style={{
    width: '58%',
    position: 'absolute',
    background: 'linear-gradient(to right, #F1EAFF, #FFFFFF)', // Equivalent to bg-gradient1
    display: 'flex',
    flexDirection: 'row', // Default direction
    gap: '5px', // Equivalent to sm:gap-5
    height: '100%', // Equivalent to h-full
    insetY: '0', // This should be removed
    alignItems: 'start', // Equivalent to items-start
    justifyContent: 'flex-end', // Equivalent to justify-end
    marginY: 'auto', // This should be removed
    padding: '12px', // Equivalent to p-12
    paddingLeft: '5px', // Equivalent to md:px-5
    paddingRight: '5px', // Equivalent to md:px-5
    right: '0', // Right position
  }}
>
            <Text
              className="sm:mt-0 mt-[27px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
            >
              Pricing
            </Text>
            <Text
              className="sm:ml-[0] ml-[93px] sm:mt-0 mt-[27px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
            >
              Academy
            </Text>
            <Button
              className="common-pointer cursor-pointer leading-[normal] mb-[867px] min-w-[109px] sm:ml-[0] ml-[92px] sm:mt-0 mt-[13px] text-base text-center tracking-[0.44px]"
              onClick={() => navigate("/signup")}
              shape="round"
              color="indigo_800"
            >
              Signup
            </Button>
            <div style={{
              position: 'absolute',
              backgroundColor: '#F7F1E5', // Equivalent to bg-gray-50
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '80vh',
              inset: '0',
              alignItems: 'start', // Equivalent to items-start
              justifyContent: 'center',
              margin: 'auto',
              maxWidth: '1012px', // Equivalent to max-w-[1012px]
              padding: '42px', // Equivalent to p-[42px]
              paddingLeft: '5px', // Equivalent to md:px-5
              paddingRight: '5px', // Equivalent to md:px-5
              borderRadius: '33px', // Equivalent to rounded-[33px]
              width: '90%', // Percentage width
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)', // Box shadow
              top: '-90px'
            }}>
              <div className="flex flex-col md:gap-10 gap-[61px] justify-start md:ml-[0] ml-[104px] mt-[30px] w-[71%] md:w-full">
                <a
                  href="javascript:"
                  className="md:ml-[0] ml-[281px] text-center text-indigo-800 text-xl"
                >
                  <Text size="txtPoppinsBold20">Sign In</Text>
                </a>
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between w-full">
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Email Address
                    </Text>
                    <input
                    data-testid="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[73%]"
                    />
                  </div>
                  <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between mt-[53px] w-full">
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Password
                    </Text>
                    <input
                    data-testid="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[73%]"
                    />
                  </div>
                  <Button
                    className="common-pointer cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[250px] mt-[70px] text-base text-center tracking-[0.44px]"
                    onClick={handleSignIn} // Handle the login when the button is clicked
                    shape="round"
                    color="indigo_800"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        <img
          src="/images/ProjectFlow-Logo.png"
          alt="ProjectFlow Logo"
          className="absolute left-[20%] transform -translate-x-1/2 top-[14%] -translate-y-1/2 ProjectFlow-Logo"
          onClick={() => navigate("/")}
          style={{ width: '450px', height: '400px', cursor:"pointer"}}
        />
        <img
          src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7967.jpg?t=st=1711620441~exp=1711624041~hmac=3b83528311f0e80091946ffe4dfcf37147f8dcda89d6c500ff643fd605982168&w=740"
          alt="PM"
          className="absolute left-[20%] transform -translate-x-1/2 top-[47%] -translate-y-1/2"
          style={{ width: '450px', height: '450px', cursor:"pointer"}}
        />

      </div>
    </>
  );
};

export default SigninPage;
