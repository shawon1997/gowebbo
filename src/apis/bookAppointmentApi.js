import { getData, postData } from "./apiInstance";

export async function bookAppointmentApi(data) {
  return await postData(
    `appointments`,
    {...data},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getBookedAppointmentListApi() {
  return await getData(
    `appointments`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getDoctorListApi(){
    //const {doctorId, date, time, patientDetails } = data;
    return await getData(
      `doctorlist`,
      //{ doctorId, date, time, patientDetails },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
}

