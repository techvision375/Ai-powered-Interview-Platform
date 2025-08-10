import React from "react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import "../../index.css";

export const Input = ({ type, label, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full space-y-1 sm:space-y-2 px-6 sm:px-5 md:px-6 lg:px-7">
      <label className="block text-base sm:text-lg md:text-xl lg:text-[23px] font-medium text-slate-800">
        {label}
      </label>
      <div className="input-box relative">
        <input
          className="w-full bg-transparent outline-none text-sm sm:text-base md:text-lg pr-8 sm:pr-10 md:pr-12"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
            {showPassword ? (
              <FaRegEye
                onClick={toggleShowPassword}
                className="cursor-pointer text-primary hover:text-primary-dark transition-colors w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
            ) : (
              <FaRegEyeSlash
                onClick={toggleShowPassword}
                className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};