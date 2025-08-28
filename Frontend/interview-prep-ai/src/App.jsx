import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/SignUp.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Dashboard from "./pages/home/Dashboard.jsx";
import InterviewPrep from "./pages/interviewPrep/InterviewPrep.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Routes>
          //default route
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
