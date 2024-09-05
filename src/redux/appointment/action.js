import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookAppointmentApi, getBookedAppointmentListApi, getDoctorListApi } from '../../apis/bookAppointmentApi';

export const bookAppointment = createAsyncThunk(
  'appointment/book',
  async (data) => {
    const response = await bookAppointmentApi(data);
    return response.data;
  }
);

export const getBookedAppointmentListAction=createAsyncThunk(
    'appointment/get',
    async ()=>{
        const response=await getBookedAppointmentListApi();
        return response.data;
    }
)
export const getDoctorList=createAsyncThunk(
    'doctor/get',
    async ()=>{
        const response=await getDoctorListApi();
        return response.data;
    }
)
