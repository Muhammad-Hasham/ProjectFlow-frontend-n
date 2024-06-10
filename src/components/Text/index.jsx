import React from "react";

const sizeClasses = {
  txtPoppinsBold16: "font-bold font-poppins",
  txtInterBold16Gray900: "font-bold font-inter",
  txtInterMedium24: "font-inter font-medium",
  txtPoppinsBold20: "font-bold font-poppins",
  txtInterBold16: "font-bold font-inter",
  txtPoppinsRegular16WhiteA70001: "font-normal font-poppins",
  txtPoppinsBold22: "font-bold font-poppins",
  txtPoppinsBold44: "font-bold font-poppins",
  txtPoppinsBold34: "font-bold font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtPoppinsRegular16WhiteA700: "font-normal font-poppins",
  txtInterBold24: "font-bold font-inter",
  txtPoppinsRegular22: "font-normal font-poppins",
  txtInterMedium24WhiteA700: "font-inter font-medium",
  txtPoppinsMedium12: "font-medium font-poppins",
  txtPoppinsExtraBold32: "font-extrabold font-poppins",
  txtInterMedium24Gray700: "font-inter font-medium",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
