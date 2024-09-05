import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/AppointmentForm.css";
import { connect } from "react-redux";
import { SlArrowDown, SlArrowUp, SlArrowRight } from "react-icons/sl";

import {
  bookAppointment,
  getBookedAppointmentListAction,
} from "../redux/appointment/action";
import AppointmentTable from "./AppointmentTable";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import moment from "moment";
import PatientDetailsForm from "./PatientDetailsForm";
import TimePickerCard from "./TimePickerCard";

const AppointmentForm = ({
  dispatchBookAppointment,
  appointmentList,
  dispatchGetBookedAppointmentListAction,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const [showTableData, setShowTableData] = useState(false);
  // Start Time
  const [startTimeHour, setStartTimeHour] = useState(12);
  const [startTimeMinute, setStartTimeMinute] = useState(0);
  const [startAMPM, setStartAMPM] = useState("PM");

  // End Time
  const [endTimeHour, setEndTimeHour] = useState(12);
  const [endTimeMinute, setEndTimeMinute] = useState(0);
  const [endAMPM, setEndAMPM] = useState("PM");
  const [isValidTimeRange, setIsValidTimeRange] = useState(true);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [isAppointmentMatched, setIsAppointmentMatched] = useState(false);

  useEffect(() => {
    dispatchGetBookedAppointmentListAction();
  }, [toggleSubmit]);

  useEffect(() => {
    const isValid = validateTimes();
    setIsValidTimeRange(isValid);
    if (!validateTimes()) {
      setIsAppointmentMatched(false);
      return;
    }
    // Convert states to match the format of the appointment array
    const formattedStartTime = `${String(startTimeHour).padStart(
      2,
      "0"
    )}:${String(startTimeMinute).padStart(2, "0")} ${startAMPM}`;
    const formattedEndTime = `${String(endTimeHour).padStart(2, "0")}:${String(
      endTimeMinute
    ).padStart(2, "0")} ${endAMPM}`;

    // Check if the current state matches any entry in the appointments array
    const matchFound = appointmentList?.some((appointment) => {
      const isSameDate =
        moment(appointment?.selectedDate).format("DD-MM-YYYY") ===
        moment(selectedDate).format("DD-MM-YYYY");
      const isWithinRange =
        moment(formattedStartTime, "h:mm A").isBetween(
          moment(appointment?.startTime, "h:mm A"),
          moment(appointment?.endTime, "h:mm A"),
          null,
          "[)" // Inclusive of start, exclusive of end
        ) ||
        moment(formattedEndTime, "h:mm A").isBetween(
          moment(appointment?.startTime, "h:mm A"),
          moment(appointment?.endTime, "h:mm A"),
          null,
          "(]" // Exclusive of start, inclusive of end
        );
      return (
        isSameDate &&
        id === appointment?.doctorId &&
        ((appointment?.startTime == formattedStartTime &&
          appointment?.endTime == formattedEndTime) ||
          isWithinRange)
      );
    });
    setIsAppointmentMatched(matchFound);
  }, [
    appointmentList,
    selectedDate,
    startTimeHour,
    startTimeMinute,
    startAMPM,
    endTimeHour,
    endTimeMinute,
    endAMPM,
  ]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleSubmit(!toggleSubmit);
    const startTime = `${String(startTimeHour).padStart(2, "0")}:${String(
      startTimeMinute
    ).padStart(2, "0")} ${startAMPM}`;
    const endTime = `${String(endTimeHour).padStart(2, "0")}:${String(
      endTimeMinute
    ).padStart(2, "0")} ${endAMPM}`;
    if (id) {
      const finalData = {
        doctorId: id,
        selectedDate,
        startTime,
        endTime,
        details,
      };
      dispatchBookAppointment(finalData);
      toast.success("Appointment has been successfully added!", {
        duration: 3000,
      });
    }

    setDetails({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setStartTimeHour(12);
    setStartTimeMinute(0);
    setStartAMPM("PM");
    setEndTimeHour(12);
    setEndTimeMinute(0);
    setEndAMPM("PM");
  };

  function validateTimes() {
    const startTime = `${String(startTimeHour).padStart(2, "0")}:${String(
      startTimeMinute
    ).padStart(2, "0")} ${startAMPM}`;
    const endTime = `${String(endTimeHour).padStart(2, "0")}:${String(
      endTimeMinute
    ).padStart(2, "0")} ${endAMPM}`;

    return startTime !== endTime;
  }

  // Convert time to minutes since midnight
  function timeToMinutes(hour, minute, ampm) {
    let adjustedHour = hour;
    if (ampm === "PM" && hour !== 12) adjustedHour += 12;
    if (ampm === "AM" && hour === 12) adjustedHour = 0;
    return adjustedHour * 60 + minute;
  }

  // Validate that start and end times are not the same and end time is later than start time
  function validateTimes() {
    const startTimeMinutes = timeToMinutes(
      startTimeHour,
      startTimeMinute,
      startAMPM
    );
    const endTimeMinutes = timeToMinutes(endTimeHour, endTimeMinute, endAMPM);

    const validTimeRange = endTimeMinutes > startTimeMinutes;
    const startTime = `${String(startTimeHour).padStart(2, "0")}:${String(
      startTimeMinute
    ).padStart(2, "0")} ${startAMPM}`;
    const endTime = `${String(endTimeHour).padStart(2, "0")}:${String(
      endTimeMinute
    ).padStart(2, "0")} ${endAMPM}`;

    return validTimeRange && startTime !== endTime;
  }

  return (
    <>
      <div className="d-flex justify-content-center p-3">
        <div className="date-picker-section pt-5" style={{ width: "50%" }}>
          <h4 className="text-center mb-3 bold">Choose Date</h4>
          <div className="d-flex justify-content-center align-items-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
            />
          </div>
        </div>

        <div className="p-5" style={{ marginRight: "50px", width: "45%",marginLeft:"50px"}}>
          <h4 className="text-start mb-3">Choose Time</h4>
          <p className="mb-4">Set time by clicking the following:</p>
          <TimePickerCard
            setStartTimeHour={setStartTimeHour}
            setStartTimeMinute={setStartTimeMinute}
            setStartAMPM={setStartAMPM}
            setEndTimeHour={setEndTimeHour}
            setEndTimeMinute={setEndTimeMinute}
            setEndAMPM={setEndAMPM}
            isAppointmentMatched={isAppointmentMatched}
            isValidTimeRange={isValidTimeRange}
            startTimeHour={startTimeHour}
            startAMPM={startAMPM}
            startTimeMinute ={startTimeMinute }
            endTimeHour ={endTimeHour }
            endTimeMinute ={endTimeMinute }
            endAMPM  ={endAMPM  }
          />
          {(isAppointmentMatched || !isValidTimeRange) && (
            <div
              className="d-flex justify-content-start align-items-center p-1 mb-3 mt-1 mt-4"
              style={{
                backgroundColor: "#fff5e5",
                border: "1px solid #be7e12",
                width: "43%",
                borderRadius: "6px",
              }}
            >
              <span
                style={{ color: "#be7e12", fontWeight: "500" }}
                className="ml-3 text-center"
              >
                Please choose another slots
              </span>
            </div>
          )}
          <PatientDetailsForm
            handleInputChange={handleInputChange}
            details={details}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div
        className="col-md-12 mt-2 d-flex justify-content-between form-control"
        style={{
          height: "40px",
          border: "1px solid",
          padding: "5px",
          backgroundColor: "rgb(38 47 85)",
          marginTop: "100px",
          marginLeft: "8px",
          width: "99%",
          marginBottom: showTableData ? "" : "50px",
        }}
      >
        <div>
          <span
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              setShowTableData(!showTableData);
            }}
          >
            {showTableData ? <SlArrowDown /> : <SlArrowRight />}
          </span>
          <span style={{ marginLeft: "15px", color: "white" }}>
            Show Previous Appointment Data
          </span>
        </div>
      </div>
      {showTableData && (
        <AppointmentTable
          data={appointmentList?.filter((el) => el?.doctorId == id)}
        />
      )}
      <Toaster />
    </>
  );
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => ({
  dispatchBookAppointment: (data) => dispatch(bookAppointment(data)),
  dispatchGetBookedAppointmentListAction: () =>
    dispatch(getBookedAppointmentListAction()),
});

const mapStateToProps = (state) => ({
  appointmentList: state.appointment.appointmentList,
});

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
