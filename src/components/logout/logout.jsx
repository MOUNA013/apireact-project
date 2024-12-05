import React from 'react';

const Logout = () => {
  const handleLogout = () => {
   
    localStorage.removeItem('token');

    
   
  }

  return (
    <button id='logoutbutton' onClick={handleLogout} >
      Logout
    </button>
  );
};


export default Logout;
