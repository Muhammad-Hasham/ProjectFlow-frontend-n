import React from "react";
import { useState} from "react";
import '../../styles/my.css';
import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Text } from "components";

const StartingpagePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-end justify-start mx-auto md:pl-10 sm:pl-5 pl-[84px] w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[99px] items-start justify-end w-full">
          <div className="flex md:flex-1 flex-col md:gap-10 gap-[212px] justify-start md:mt-0 mt-[70px] w-2/5 md:w-full">
            <Text
              className="ml-2.5 md:ml-[0] text-[38px] text-center text-indigo-800 sm:text-lg md:text-xl"
              size="txtPoppinsBold22"
              onClick={() => navigate("/")}
            >
              ProjectFlow
            </Text>
            <div className="flex flex-col items-center justify-start w-full">
              <Text
                className="sm:text-[34px] md:text-[40px] text-[44px] text-indigo-800 w-full"
                size="txtPoppinsBold44"
              >
                Your Next Project Management Platform
              </Text>
              <Text
                className="leading-[34.00px] mt-[30px] text-[22px] text-blue_gray-300 sm:text-lg md:text-xl w-[98%] sm:w-full"
                size="txtPoppinsRegular22"
              >
                Fully Customizable performance management platform that suits
                your culture. not the other way around
              </Text>
              <div className="flex mt-16 relative w-full">
                <Input
                  name="addyouremailaddress"
                  placeholder="Add your email addresss"
                  className="font-medium p-0 placeholder:text-gray-800 text-[13px] text-left tracking-[0.44px] w-full"
                  wrapClassName="flex inset-y-[0] left-[0] ml-[undefinedpx] my-auto w-[65%] z-[1]"
                  type="email"
                  prefix={
                    <Img
                      className="mr-6 right-[4%] ml-[undefinedpx] z-[1] my-auto"
                      src="images/img_mail.svg"
                      alt="mail"
                    />
                  }
                ></Input>
                <Button
                  className="common-pointer cursor-pointer font-medium min-w-[199px] ml-[-7px] my-auto rounded-br-[15px] rounded-tr-[15px] text-[13px] text-center tracking-[0.44px] z-[1]"
                  onClick={() => navigate("/signup")}
                  size="sm"
                  variant="gradient"
                  color="blue_gray_300_01_deep_orange_500"
                >
                  Get Started for free
                </Button>
              </div>
            </div>
          </div>
          <div className="h-[1024px] sm:h-[1143px] relative w-[54%] md:w-full">
            <div style={{ 
              backgroundImage: 'linear-gradient(to right, #F1EAFF, #FFFFFF)',
              display: 'flex',
              flexDirection: 'row',
              gap: '5rem', // Adjust as needed
              height: '100vh',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              margin: 'auto',
              padding: '3rem', // Adjust as needed
              '@media (min-width: 768px)': {
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
              },
              width: '100%',
              height: '100%',
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
                className={`common-pointer sm:ml-[0] ml-[79px] sm:mt-0 mt-[27px] text-base text-white tracking-[0.44px] hover-signin`}
                size="txtPoppinsRegular16"
                onClick={() => navigate("/signin")}
              >
              Signin
            </Text>
              <Button
                className="common-pointer cursor-pointer leading-[normal] mb-[867px] min-w-[109px] sm:ml-[0] ml-[92px] sm:mt-0 mt-[13px] text-base text-center tracking-[0.44px]"
                onClick={() => navigate("/signup")}
                shape="round"
                color="indigo_800"
              >
                Signup
              </Button>
            </div>
            <Img
              className="absolute bottom-[17%] h-[633px] object-cover right-[0] w-[93%]"
              src="images/img_heroimage.png"
              alt="heroimage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StartingpagePage;
