import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user &&
    <div className="flex items-center">
      <img
        src={user.profileImageUrl}
        alt=""
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div>
        <div>{user.username || ""}</div>
        <button
          onClick={handleLogout}
          className="text-amber-600 text-sm font-semibold cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
