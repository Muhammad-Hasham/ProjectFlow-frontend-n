import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Text } from "components";

const SignuprolePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state;
  const roles = ["Project Manager", "Team Member", "Client"];
  const [selectedRole, setSelectedRole] = useState(roles[0]); // Set the default role

  const handleSignup = () => {
    // Combine signupData and selectedRole to send to your API
    const combinedData = {
      ...signupData,
      role: selectedRole,
    };

    // Send combinedData to your server
    fetch("https://projectflow-cgjn.onrender.com/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
      localStorage.setItem("userid",data.data.user._id)
      localStorage.setItem("username",data.data.user.name)
      localStorage.setItem("email",data.data.user.email)
      localStorage.setItem("role",data.data.user.role)
      alert("Signup Successfully")
        navigate("/signin"); // Navigate to the dashboard or appropriate page.
      })
      .catch((error) => {
        console.error("Signup failed", error);
      });
  };

  return (
    <>
      <div className="bg-white-A700 font-poppins h-[1024px] mx-auto md:pl-10 sm:pl-5 pl-[94px] relative w-full">
        <div style={{
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
  }}>
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
          <Text
                className={`common-pointer sm:ml-[0] ml-[79px] sm:mt-0 mt-[27px] text-base text-indigo-800 tracking-[0.44px] hover-signin`}
                size="txtPoppinsRegular16"
                onClick={() => navigate("/signin")}
              >
              Signin
            </Text>
          <Button
            className="cursor-pointer leading-[normal] mb-[867px] min-w-[109px] sm:ml-[0] ml-[92px] sm:mt-0 mt-[13px] text-base text-center tracking-[0.44px]"
            shape="round"
            color="indigo_800"
            onClick={handleSignup}
          >
            Signup
          </Button>
        </div>
        <Text
          className="absolute left-[9%] text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl top-[7%]"
          size="txtPoppinsBold22"
          onClick={() => navigate("/")}
        >
          ProjectFlow
        </Text>
        <div style = {{backgroundColor: '#F7F1E5', }} className="absolute flex flex-col h-max inset-[0] items-center justify-center m-auto max-w-[1023px] p-10 md:px-5 rounded-[30px] w-full">
          <div className="flex flex-col justify-start mb-1.5 w-[33%] md:w-full">
            <a href="javascript:" className="ml-28 md:ml-[0] text-center text-indigo-800 text-xl">
              <Text size="txtPoppinsBold20">Sign Up</Text>
            </a>
            <Text className="mt-11 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
              What is your role in the organization?
            </Text>
            <div className="flex flex-row gap-[65px] items-center justify-end md:ml-[0] ml-[41px] mt-[39px] w-[84%] md:w-full">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Role
              </Text>
              <select
                className="flex flex-col h-[38px] md:h-auto items-center justify-center w-[159px] rounded-md border border-indigo-800"
                value={selectedRole} // Set the value to the selectedRole state
                onChange={(e) => setSelectedRole(e.target.value)} // Update the selectedRole state
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="common-pointer cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[97px] mr-[105px] mt-[83px] text-base text-center tracking-[0.44px]"
              onClick={handleSignup}
              shape="round"
              color="indigo_800"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignuprolePage;
