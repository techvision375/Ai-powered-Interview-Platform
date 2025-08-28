import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../componants/Inputs/input.js";
import { ProfilePhotoSelector } from "../../componants/Inputs/ProfilePhotoSelector.jsx";
import "../../index.css";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";

const Login = ({ setCurrentPage }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);
  const [profilePic, setprofilePic] = useState(null);

  const {updateUser} = useContext(UserContext);


  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError(""); // Clear previous errors
    // Login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN ,{
        email,
        password
      });
      console.log(response.data);

      const {token} = response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }



    }catch(error){
      if(error.response && error.response.data.message === 401) {
        setError("Invalid email or password.");
      }
      else{
        setError("An unexpected error occurred. Please try again later.");
      }

    }

  };

  return (
    <div className="w-[90vw] md:w-[33vw]  p-7 flex flex-col items-center justify-center bg-white">
      <h3 className="text-3xl font-semibold text-black">Welcome Back!</h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        please enter your credentials to login
      </p>
      <form onSubmit={handleLogin}>
        {/* <ProfilePhotoSelector image={profilePic} setimage={setprofilePic} /> */}
        <Input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          label="Password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="********"
          type="password"
        />

        {error && <p className="text-red-500 text-xm pb-2.5">{error}</p>}

        <button className="btn-primary  " type="submit">
          Login
        </button>
        <p className="text-[13px] text-slate-800 mt-3">
          Dont have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
