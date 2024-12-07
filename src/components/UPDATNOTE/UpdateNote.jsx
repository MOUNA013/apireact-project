import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./UpdateNote.css";

const UpdateNote = ({ currentNote, setNotes, setIsEditing }) => {
  const [updatedTitle, setUpdatedTitle] = useState(currentNote.title);
  const [updatedContent, setUpdatedContent] = useState(currentNote.content);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(
    currentNote.sharedWith?.map((user) => ({
      value: user.id,
      label: user.name,
    })) || []
  );

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://notes.devlop.tech/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Raw API Response:", response.data);
  
        
        const options = response.data.map((user) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`, 
        }));
  
        console.log("Mapped Options:", options);
        setUsers(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const sharedWithIds = selectedUsers.map((user) => user.value);

      const response = await axios.put(
        `https://notes.devlop.tech/api/notes/${currentNote.id}`,
        { title: updatedTitle, content: updatedContent, sharedWith: sharedWithIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNote.id
            ? { ...note, title: updatedTitle, content: updatedContent }
            : note
        )
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div id="update-note-form">
      <label htmlFor="updated-title">
        Title:
        <input
          id="updated-title"
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      </label>
      <label htmlFor="updated-content">
        Content:
        <input
          id="updated-content"
          type="text"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      </label>
      <label htmlFor="share-with">
        Share With:
        <Select
          id="share-with"
          options={users}
          isMulti
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Select users to share with"
        />
      </label>
      <button id="update-button" onClick={handleUpdate}>
        Update
      </button>
      <button id="cancel-button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </div>
  );
};

export default UpdateNote;
