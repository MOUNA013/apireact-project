import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all users from the API
  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage
      const response = await axios.get('https://yourapi.com/api/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
        },
      });
      
      setUsers(response.data); // Set the response data to state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError(error.message); // Set error message if there was an issue
      setLoading(false); // Set loading to false if there was an error
    }
  };

  useEffect(() => {
    getAllUsers(); // Fetch users when the component mounts
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error}</div>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
