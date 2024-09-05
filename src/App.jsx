// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorSelection from './components/DoctorSelection';
import AppointmentForm from './components/AppointmentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorSelection />} />
        <Route path="/appointment/:id" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
