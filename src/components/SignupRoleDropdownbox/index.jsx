import React from "react";

import { Img, Line, Text } from "components";

const SignupRoleDropdownbox = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="md:h-[162px] sm:h-[167px] h-full sm:px-5 px-[34.41px] py-[21.03px] relative w-full">
          <div className="h-[38px] m-auto w-full">
            <div className="absolute md:h-[25px] h-[35px] inset-[0] justify-center m-auto w-full">
              <div className="absolute bg-white-A700 h-[25px] inset-[0] m-auto outline outline-[2px] outline-indigo-800 rounded-[10px] w-full"></div>
              <div className="absolute flex flex-col h-full inset-y-[0] items-center justify-center left-[16%] my-auto w-auto">
                <Text
                  className="text-blue_gray-900 text-xs tracking-[0.36px] w-auto"
                  size="txtPoppinsMedium12"
                >
                  {props?.menulabel}
                </Text>
              </div>
            </div>
            <Img
              className="absolute h-[38px] inset-y-[0] my-auto right-[16%] w-[38px]"
              src="images/img_arrowdown.svg"
              alt="arrowdown"
            />
          </div>
          <div className="absolute bottom-[55%] flex flex-col inset-x-[0] items-center justify-start mx-auto w-full">
            <div className="bg-white-A700 flex flex-col md:gap-10 gap-[79px] md:h-auto h-px items-center justify-end rounded-bl-[15px] rounded-br-[15px] w-[213px] md:w-full">
              <div className="flex flex-col md:gap-[17.2px] items-center justify-between md:px-10 sm:px-5 px-[45.88px] py-[21.03px] w-full">
                {!!props?.createfromframeOne ? (
                  <Line className="bg-white-A700 h-[-256px] w-full" />
                ) : null}
                <div className="flex flex-col items-start justify-start">
                  {!!props?.labelfour ? (
                    <Text
                      className="text-blue_gray-900 text-xs tracking-[0.36px]"
                      size="txtPoppinsMedium12"
                    >
                      {props?.labelfour}
                    </Text>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col md:gap-[17.2px] items-center justify-between md:px-10 sm:px-5 px-[45.88px] py-[21.03px] w-full">
                {!!props?.createfromframeTwo ? (
                  <Line className="bg-white-A700 h-[-336px] w-full" />
                ) : null}
                <div className="flex flex-col items-start justify-start">
                  {!!props?.labelfive ? (
                    <Text
                      className="text-blue_gray-900 text-xs tracking-[0.36px]"
                      size="txtPoppinsMedium12"
                    >
                      {props?.labelfive}
                    </Text>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SignupRoleDropdownbox.defaultProps = { menulabel: "On Track" };

export default SignupRoleDropdownbox;
