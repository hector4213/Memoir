import React, { useState } from "react";
import "./DateEntry.scss";

const DateEntry = (props) => {
  const { notFilledStyle, setDate, date, month_F, day_F, year_F } = props;

  const [daysLength, setDaysLength] = useState(
    date.month ? daysInMonth(date.month) : 0
  );

  let dayOptions = [];
  for (let i = 1; i <= daysLength; i++) {
    dayOptions.push(
      <option key={i} value={i}>
        {" "}
        {i}{" "}
      </option>
    );
  }

  return (
    <div className="date">
      <select
        name="months"
        className="months"
        style={month_F ? {} : notFilledStyle}
        value={date.month ? date.month : ""}
        onChange={(e) => {
          e.preventDefault();

          const month = e.target.value;
          setDaysLength(daysInMonth(month));
          setDate({ ...date, month: month, month_F: true });
        }}
      >
        <option value="">Month:</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <select
        name="days"
        className="days"
        style={day_F ? {} : notFilledStyle}
        value={date.day ? date.day : ""}
        onChange={(e) => setDate({ ...date, day: e.target.value, day_F: true })}
      >
        <option value="">Day:</option>
        {dayOptions}
      </select>

      <input
        name="year"
        type="number"
        placeholder="Year"
        style={year_F ? {} : notFilledStyle}
        value={date.year ? date.year : ""}
        onChange={(e) => {
          if (
            e.target.value &&
            !isNaN(e.target.value) &&
            e.target.value.length === 4
          ) {
            setDate({ ...date, year: e.target.value, year_F: true });
          } else {
            setDate({ ...date, year: e.target.value, year_F: false });
          }
        }}
      />
    </div>
  );
};

const daysInMonth = (month) => {
  let daylength = 0;

  if (
    // MONTHS WITH 30 DAYS
    month === "4" ||
    month === "6" ||
    month === "9" ||
    month === "11"
  ) {
    daylength = 30;
  } else if (month === "2") {
    daylength = 28;
  } else {
    daylength = 31;
  }

  return daylength;
};

export default DateEntry;
