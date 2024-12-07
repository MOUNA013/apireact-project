import React from "react";
import "./logout.css";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login"; 
  };

  return (
    <button id="logoutbutton" onClick={handleLogout}>
      
    </button>
  );
};

export default Logout;
