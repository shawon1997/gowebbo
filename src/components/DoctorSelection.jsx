// src/pages/DoctorSelection.jsx
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDoctorList } from '../redux/appointment/action';

const DoctorSelection = ({ doctors, dispatchGetDoctorList }) => {
  const navigate = useNavigate();

  useEffect(()=>{
    dispatchGetDoctorList()
  },[])


  const handleDoctorSelection = (doctor) => {
    navigate(`/appointment/${doctor?.id}`); // Redirect to the appointment form
  };

  return (
    <>
      <h2 className='text-center mt-5'>Choose Doctor</h2>
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh",width:"100%"}}>
      <div className='d-flex justify-content-center text-center'>
        {doctors?.map((doctor) => {
          return (<div key={doctor?.id} className='m-4 p-1 pointer' style={{width:"250px",height:"250px",border:"1px solid",borderRadius:"6px"}}
          onClick={() => handleDoctorSelection(doctor)}>
          <img style={{width:"100%",height:"100%",cursor:"pointer"}} src={doctor?.profilePic} alt='doctor'/>
            <span className='mt-3' style={{fontSize:"18px",fontWeight:"600",display: "inline-block"}}>{doctor?.name}</span>
          </div>)
        })}
      </div>
    </div>
    </>
  );
};

// Map state to props
const mapStateToProps = (state) => ({
  doctors: state.appointment.doctorList,
});

// Map dispatch to props
const mapDispatchToProps = (dispatch) => ({
  dispatchGetDoctorList: () => dispatch(getDoctorList()),
});

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSelection);
