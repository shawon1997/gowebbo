import React from 'react';
import { Table } from 'react-bootstrap';
import '../style/AppointmentTable.css'; // Make sure to create this CSS file for additional styling if needed
import moment from 'moment';
const AppointmentTable = ({ data}) => {
  return (
    <div className="dynamic-table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Selected Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((appointment) => (
              <tr key={appointment?.id}>
                <td>{
                    moment(appointment?.selectedDate).format("DD-MM-YYYY")
                     }</td>
                <td>{appointment?.startTime}</td>
                <td>{appointment?.endTime}</td>
                <td>{appointment?.details.firstName}</td>
                <td>{appointment?.details.lastName}</td>
                <td>{appointment?.details.email}</td>
                <td>{appointment?.details.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AppointmentTable;
