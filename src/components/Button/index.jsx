import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-lg" };
const variants = {
  gradient: {
    blue_gray_300_01_deep_orange_500: "bg-gradient  text-white-A700",
  },
  fill: {
    indigo_800: "bg-indigo-800 text-white-A700",
    indigo_800_01: "bg-indigo-800_01 text-white-A700",
  },
};
const sizes = { xs: "p-3", sm: "p-[22px] sm:px-5" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "xs",
  variant = "fill",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["gradient", "fill"]),
  color: PropTypes.oneOf([
    "blue_gray_300_01_deep_orange_500",
    "indigo_800",
    "indigo_800_01",
  ]),
};

export { Button };
