import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Line, Text } from "../../components";
import '../../styles/my.css';
import { useState } from "react";

const containerStyle = {
  position: 'absolute',
  backgroundColor: '#D1D5DB', // Equivalent to bg-gray-50
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100vh', // Equivalent to h-max
  insetY: '0', // Equivalent to inset-y-[0]
  alignItems: 'center', // Equivalent to items-center
  justifyContent: 'flex-end', // Equivalent to justify-end
  left: '0', // Left position
  margin: 'auto',
  maxWidth: '85%', // Equivalent to w-[85%]
  padding: '38px', // Equivalent to p-[38px]
  paddingLeft: '5px', // Equivalent to sm:px-5
  paddingRight: '5px', // Equivalent to sm:px-5
  borderRadius: '30px', // Equivalent to rounded-[30px]
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")

  

  const handleSignup = () => {
    const SignupData = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: confirmpassword,
    };
    navigate("/signuprole", { state: SignupData });
  };

  return (
    <div className="bg-white-A700 flex sm:flex-col md:flex-col flex-row font-poppins gap-[9px] items-start mx-auto md:pl-10 sm:pl-5 pl-[94px] w-full">
      <Text
        className="md:mt-0 mt-[70px] text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
        size="txtPoppinsBold22"
        onClick={() => navigate("/")}
      >
        ProjectFlow
      </Text>
      <div className="h-[1024px] sm:h-[1143px] relative w-[90%] md:w-full">
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
        <div style = {{backgroundColor: '#F7F1E5', }} className="absolute flex flex-col h-max inset-y-[0] items-center justify-end left-[0] my-auto p-[38px] sm:px-5 rounded-[30px] w-[85%]">
          <div className="flex flex-col md:gap-10 gap-[84px] items-center justify-start mt-[54px] w-4/5 md:w-full">
            <a href="javascript:" className="text-center text-indigo-800 text-xl">
              <Text size="txtPoppinsBold20">Sign Up</Text>
            </a>
            <div className="w-full">
              <div className="flex flex-col sm:flex-row w-full sm:gap-10">
                <div className="w-[30%] sm:w-[100%] mb-[10px] sm:mb-0">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Name
                  </Text>
                </div>
                <div className="w-[70%] sm:w-[100%] mb-[10px] sm:mb-0">
                  <input
                  data-testid="name"
                    type="text"
                    className="rounded-md mt-[5px] text-base text-indigo-800 tracking-[0.44px] w-full p-[5px]"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full sm:gap-10">
                <div className="w-[30%] sm:w-[100%] mb-[10px] sm:mb-0">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Email Address
                  </Text>
                </div>
                <div className="w-[70%] sm:w-[100%] mb-[10px] sm:mb-0">
                  <input
                  data-testid="email"
                    type="email"
                    className="rounded-md mt-[5px] text-base text-indigo-800 tracking-[0.44px] w-full p-[5px]"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full sm:gap-10">
                <div className="w-[30%] sm:w-[100%] mb-[10px] sm:mb-0">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Password
                  </Text>
                </div>
                <div className="w-[70%] sm:w-[100%] mb-[10px] sm:mb-0">
                  <input
                  data-testid="password"
                    type="password"
                    className="rounded-md mt-[5px] text-base text-indigo-800 tracking-[0.44px] w-full p-[5px]"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full">
                <Text
                  className="mt-[10px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                >
                  Confirm Password
                </Text>
              </div>
              <div className="w-[70%] sm:w-[100%] mb-[10px] sm:mb-0">
                <input
                data-testid="confirm-password"
                  type="password"
                  className="rounded-md mt-[5px] text-base text-indigo-800 tracking-[0.44px] w-full p-[5px]"
                  value={confirmpassword}
                    onChange={(e)=>setConfirmpassword(e.target.value)}
                />
              </div>

              <Button
                className="common-pointer cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[314px] mt-[40px] text-base text-center tracking-[0.44px]"
                onClick={handleSignup}
                shape="round"
                color="indigo_800"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SignupPage;