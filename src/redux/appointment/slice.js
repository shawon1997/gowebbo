// src/redux/reducers/appointmentReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { bookAppointment, getBookedAppointmentListAction, getDoctorList } from './action';
import initialState from './initialState';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: initialState,
  //reducers: {
  //  resetState: (state) => {
  //    return initialState;
  //  },
  //},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        const { success, message, appointmentDetails = {} } = action.payload;

        if (success === 0) {
          return {
            ...state,
            fetching: false,
            error: message,
            appointmentDetails,
            success,
          };
        }

        return {
          ...state,
          fetching: false,
          success,
          appointmentDetails,
          message,
        };
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.fetching = false;
        state.success = 0;
        state.error = action.error.message;
      })
      .addCase(getDoctorList.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getDoctorList.fulfilled, (state, {payload}) => {
        const { success, message, appointmentDetails = {} } = payload;

        if (success === 0) {
          return {
            ...state,
            fetching: false,
            error: message,
            doctorList:[],
            success,
          };
        }

        return {
          ...state,
          fetching: false,
          success,
          doctorList:payload,
          message,
        };
      })
      .addCase(getDoctorList.rejected, (state, action) => {
        state.fetching = false;
        state.success = 0;
        state.error = action.error.message;
      })
      .addCase(getBookedAppointmentListAction.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getBookedAppointmentListAction.fulfilled, (state, {payload}) => {
        const { success, message} = payload;

        if (success === 0) {
          return {
            ...state,
            fetching: false,
            error: message,
            appointmentList:[],
            success,
          };
        }

        return {
          ...state,
          fetching: false,
          success,
          appointmentList:payload,
          message,
        };
      })
      .addCase(getBookedAppointmentListAction.rejected, (state, action) => {
        state.fetching = false;
        state.success = 0;
        state.error = action.error.message;
      });
  },
});

//// Export the resetState action
//export const { resetState } = appointmentSlice.actions;

// Export the reducer
export default appointmentSlice;
