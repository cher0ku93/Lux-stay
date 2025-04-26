import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.styles.scss";

const CalendarComponent = ({ reservedDates }) => {

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return reservedDates.some(
        (reservedDate) => reservedDate.toDateString() === date.toDateString()
      )
        ? "reserved-date"
        : null;
    }
  };

  return (
    <div className="calendar-container">
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarComponent;
