import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrailRequestForm from './components/Candidates/TrailRequestForm';
import SignupForm from './components/Candidates/SignupForm';
import LoginPage from './components/Candidates/LoginPage';
import Dashboard from './components/Candidates/dashboard';
import PendingRequests from './components/Admin/PendingRequests';
import DeniedRequests from './components/Admin/DeniedRequests';
import ApprovedRequests from './components/Admin/ApprovedRequests';
import Thankyoupage from './components/Candidates/Thankyoupage';
import PaymentForm from './components/Candidates/PaymentForm';
import Resultpage from './components/Admin/Resultpage';
import UploadVideo from './components/Examiner/uploadvideo';
import Payment from './components/Admin/pendingPayment';
import PaymentApproval from './components/Admin/PaymentApproval';
import RejectPayment from './components/Admin/RejectPayment';
import MainLog from './components/Admin/mainLog';
import ConfirmRequests from './components/Candidates/confirmation';
import AdminLogin from './components/Admin/LoginPanel';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserProfile from './components/Admin/UserProfile';
import ExaminarLogin from './components/Examiner/ExaminarLogin';
import ExaminarHome from './components/Examiner/ExaminarHome';
import CandidateList from './components/Examiner/Candidatelist';
import ExamAplication from './components/Examiner/ExamApplication';
import View from './components/Examiner/View';
import Allcandidates from './components/Examiner/AllCandidates';
import Result from './components/Examiner/Result';
import CandidateVideo from './components/Candidates/CandidateVideo';
import ObjectResult from './components/Admin/ObjectResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLog />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/trail-request" element={<TrailRequestForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/pending-request" element={<PendingRequests />} />
        <Route path="/denied-request" element={<DeniedRequests/>}/>
        <Route path="/ApprovedRequests" element={<ApprovedRequests/>}/>
        <Route path="/Thank" element={<Thankyoupage/>}/>
        <Route path="/payment-form" element={<PaymentForm/>}/>
        <Route path="/upvideo" element={<UploadVideo />} />
        <Route path="/results" element={<Resultpage />} />
        <Route path="/pending-payment" element={<Payment/>}/>
        <Route path="/aproval-payment" element={<PaymentApproval/>}/>
        <Route path="/reject-payment" element={<RejectPayment/>}/>
        <Route path="/ConfirmationRequest" element={<ConfirmRequests/>}/>
        <Route path="/Adminlogin" element={<AdminLogin/>}/>
        <Route path="/Admin-Dash" element={<AdminDashboard/>}/>
        <Route path="/User-Profile" element={<UserProfile/>}/>
        <Route path="/Examo-login" element ={<ExaminarLogin/>}/>
        <Route path="/Exam-Home" element={<ExaminarHome/>}/>
        <Route path="/Can-list" element={<CandidateList/>}/>
        <Route path="/Exam-App" element={<ExamAplication/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/All" element={<Allcandidates/>}/>
        <Route path="/res" element={<Result/>}/>
        <Route path="/can-video" element={<CandidateVideo/>}/>
        <Route path="/obj-result" element={<ObjectResult/>}/>

        
       
        
        </Routes>
    </Router>
  );
}

export default App;