import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../componants/Inputs/Input.jsx";
import "../../index.css";
import { ProfilePhotoSelector } from "../../componants/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import {uploadImage} from "../../utils/uploadimage";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setprofilePic] = useState(null);
  const [fullname, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullname) {
      setError("Full name is required.");
      return;
    }
    if (!validateEmail(email)) {
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
    setError("");
    // Signup API call

    try {
      if (profilePic) {
        const imgUploadResponse = await uploadImage(profilePic);
        console.log("Image upload response:", imgUploadResponse);
        profileImageUrl = imgUploadResponse.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        username : fullname,
        email,
        password,
        profileImageUrl
      });
      console.log("Signup response:", response.data);

      const {token} = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col items-center justify-center bg-white">
      <h3 className="text-3xl font-semibold text-black">Create an account</h3>
      <p className="text-lg text-slate-700 mt-[5px] mb-6">
        join us today by entering your details below
      </p>
      <form onSubmit={handleSignup}>
        <ProfilePhotoSelector image={profilePic} setimage={setprofilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mt-3">
          <Input
            value={fullname}
            onChange={(e) => setfullName(e.target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email Address"
            placeholder="example@1345.com"
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
          <button className="btn-primary" type="submit">
            Sign Up
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
              }}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
