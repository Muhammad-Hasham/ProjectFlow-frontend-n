import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM/dd/yyyy"
      className="border-b border-indigo-800 text-base"
      
      customInput={
        <input
          className="border-none focus:outline-none w-full text-right"
          style={{ borderBottom: "1px solid #323F73", marginRight: "445px" }}
          placeholder="MM/dd/yyyy"
        />
      }
      calendarContainer={({ children }) => (
        <div className="relative">
          {children}
          <img
            src="images/datepicker.png"
            alt="calendar-icon"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
            
            onClick={(e) => {
              e.preventDefault();
              handleDateChange(null);
            }}
          />
        </div>
      )}
    />
  );
};

export { MyDatePicker };
