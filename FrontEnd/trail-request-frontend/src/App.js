import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrailRequestForm from './components/TrailRequestForm';
import SignupForm from './components/SignupForm';
import LoginPage from './components/LoginPage';
import Dashboard from './components/dashboard';
import PendingRequests from './components/PendingRequests';
import DeniedRequests from './components/DeniedRequests';
import ApprovedRequests from './components/ApprovedRequests';
import Thankyoupage from './components/Thankyoupage'
import PaymentForm from './components/PaymentForm';
import Resultpage from './components/Resultpage';
import UploadVideo from './components/uploadvideo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/trail-request" element={<TrailRequestForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/pending-request" element={<PendingRequests />} />
        <Route path="/denied-request" element={<DeniedRequests/>}/>
        <Route path="/ApprovedRequests" element={<ApprovedRequests/>}/>
        <Route path="/Thank" element={<Thankyoupage/>}/>
        <Route path="/payment-form" element={<PaymentForm/>}/>
        <Route path="/upvideo" element={<UploadVideo />} />
        <Route path="/results" element={<Resultpage />} />
      </Routes>
    </Router>
  );
}

export default App;