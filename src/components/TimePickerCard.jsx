import React from "react";
import { SlArrowDown, SlArrowUp, SlArrowRight } from "react-icons/sl";

const TimePickerCard = ({
  setStartTimeHour,
  setStartTimeMinute,
  setStartAMPM,
  setEndTimeHour,
  setEndTimeMinute,
  setEndAMPM,
  isAppointmentMatched,
  isValidTimeRange,
  startTimeHour,
  startAMPM,
  startTimeMinute,
  endTimeHour,
  endTimeMinute,
  endAMPM
}) => {
  // Increment and decrement functions for start time (12-hour format)
  const incrementStartHour = () => {
    setStartTimeHour((prevHour) => {
      const newHour = (prevHour % 12) + 1;
      if (newHour === 12) {
        setStartAMPM((prev) => (prev === "AM" ? "PM" : "AM")); // Toggle AM/PM on 12
      }
      return newHour;
    });
  };

  const decrementStartHour = () => {
    setStartTimeHour((prevHour) => {
      const newHour = prevHour === 1 ? 12 : prevHour - 1;
      if (newHour === 11) {
        setStartAMPM((prev) => (prev === "AM" ? "PM" : "AM")); // Toggle AM/PM on 11 -> 12 transition
      }
      return newHour;
    });
  };

  const incrementStartMinute = () => {
    setStartTimeMinute((prevMinute) => (prevMinute + 1) % 60);
  };

  const decrementStartMinute = () => {
    setStartTimeMinute((prevMinute) => (prevMinute - 1 + 60) % 60);
  };

  // Increment and decrement functions for end time (12-hour format)
  const incrementEndHour = () => {
    setEndTimeHour((prevHour) => {
      const newHour = (prevHour % 12) + 1;
      if (newHour === 12) {
        setEndAMPM((prev) => (prev === "AM" ? "PM" : "AM")); // Toggle AM/PM on 12
      }
      return newHour;
    });
  };

  const decrementEndHour = () => {
    setEndTimeHour((prevHour) => {
      const newHour = prevHour === 1 ? 12 : prevHour - 1;
      if (newHour === 11) {
        setEndAMPM((prev) => (prev === "AM" ? "PM" : "AM"));
      }
      return newHour;
    });
  };

  const incrementEndMinute = () => {
    setEndTimeMinute((prevMinute) => (prevMinute + 1) % 60);
  };

  const decrementEndMinute = () => {
    setEndTimeMinute((prevMinute) => (prevMinute - 1 + 60) % 60);
  };

  return (
    <div className="d-flex" style={{ gap: "25px" }}>
      {/* Start Time */}
      <div
        className="d-flex align-items-center"
        style={{
          width: "200px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          borderRadius: "6px",
        }}
      >
        <div
          className="time-unit"
          style={{ padding: "15px", marginLeft: "15px" }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
            onClick={incrementStartHour}
          >
            <SlArrowUp />
          </button>
          <input
            type="text"
            id="hours"
            style={{
              opacity: !isAppointmentMatched && isValidTimeRange ? "1" : "0.5",
            }}
            value={String(startTimeHour).padStart(2, "0")}
            readOnly
          />
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginTop: "10px",
            }}
            onClick={decrementStartHour}
          >
            <SlArrowDown />
          </button>
        </div>
        <span>:</span>
        <div className="time-unit" style={{ padding: "15px" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
            onClick={incrementStartMinute}
          >
            <SlArrowUp />
          </button>
          <input
            type="text"
            id="minutes"
            style={{
              opacity: !isAppointmentMatched && isValidTimeRange ? "1" : "0.5",
            }}
            value={String(startTimeMinute).padStart(2, "0")}
            readOnly
          />
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginTop: "10px",
            }}
            onClick={decrementStartMinute}
          >
            <SlArrowDown />
          </button>
        </div>
        <div className="ampm-toggle">
          <button
            onClick={() =>
              setStartAMPM((prev) => (prev === "AM" ? "PM" : "AM"))
            }
            style={{
              border: "none",
              backgroundColor: "white",
              opacity: !isAppointmentMatched && isValidTimeRange ? "1" : "0.5",
            }}
            className="ampm-btn"
          >
            {startAMPM}
          </button>
        </div>
      </div>

      {/* End Time */}
      <div
        className="d-flex align-items-center"
        style={{
          width: "200px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          borderRadius: "6px",
        }}
      >
        <div
          className="time-unit"
          style={{ padding: "15px", marginLeft: "15px" }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
            onClick={incrementEndHour}
          >
            <SlArrowUp />
          </button>
          <input
            type="text"
            id="hours"
            value={String(endTimeHour).padStart(2, "0")}
            style={{
              opacity: !isAppointmentMatched && isValidTimeRange ? "1" : "0.5",
            }}
            readOnly
          />
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginTop: "10px",
            }}
            onClick={decrementEndHour}
          >
            <SlArrowDown />
          </button>
        </div>
        <span>:</span>
        <div className="time-unit" style={{ padding: "15px" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
            onClick={incrementEndMinute}
          >
            <SlArrowUp />
          </button>
          <input
            type="text"
            id="minutes"
            style={{
              opacity: !isAppointmentMatched && isValidTimeRange ? "1" : "0.5",
            }}
            value={String(endTimeMinute).padStart(2, "0")}
            readOnly
          />
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              marginTop: "10px",
            }}
            onClick={decrementEndMinute}
          >
            <SlArrowDown />
          </button>
        </div>
        <div className="ampm-toggle">
          <button
            onClick={() => setEndAMPM((prev) => (prev === "AM" ? "PM" : "AM"))}
            style={{
              border: "none",
              backgroundColor: "white",
              opacity: !isAppointmentMatched && isValidTimeRange ? "1" : "0.5",
            }}
            className="ampm-btn"
          >
            {endAMPM}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerCard;
