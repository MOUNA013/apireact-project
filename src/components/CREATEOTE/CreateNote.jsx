import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./CreateNote.css";

function CreateNote(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]); 
  const [selectedUsers, setSelectedUsers] = useState([]); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://notes.devlop.tech/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
        const options = response.data.map((user) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
        }));

        setUsers(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

   
    const sharedWithIds = selectedUsers.map((user) => user.value);

    const noteData = {
      title,
      content,
      sharedWith: sharedWithIds,
    };

    try {
      const response = await axios.post("https://notes.devlop.tech/api/notes", noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setNotes((prevNotes) => [...prevNotes, response.data]); 
      setTitle("");
      setContent("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const SaveFunction = () => {
    document.getElementById("addnoteform").style.display = "none";
  };

  const handleCreateNote = () => {
    props.setClicked(true);
    document.getElementById("addnoteform").style.display = "block";
  };

  return (
    <>
      <form id="addnoteform" onSubmit={handleSubmit}>
        <input
          id="input-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
        />
        <input
          id="input-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content"
        />
        <br />
        <label htmlFor="share-with">Share With:</label>
        <Select
          id="share-with"
          options={users}
          isMulti
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Select users to share with"
        />
        <button id="save-note-button" onClick={SaveFunction} type="submit">
          Save Note
        </button>
      </form>
      <button id="creatbutton" onClick={handleCreateNote}>+</button>
    </>
  );
}

export default CreateNote;
