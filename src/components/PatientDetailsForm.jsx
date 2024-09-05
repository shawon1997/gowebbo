import React from "react";

const PatientDetailsForm = ({handleInputChange,details,handleSubmit}) => {
  return (
    <div className="details-section mt-5">
      <h4 className="text-start mb-4">Details</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group mb-3 col-md-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control"
              style={{ textAlign: "left" }}
              value={details.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              style={{ textAlign: "left" }}
              value={details.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={details.email}
              style={{ textAlign: "left" }}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-control"
              value={details.phone}
              style={{ textAlign: "left" }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="text-start">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={
              !details?.email ||
              !details?.firstName ||
              !details?.lastName ||
              !details?.phone ||
              isAppointmentMatched ||
              !isValidTimeRange
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDetailsForm;
