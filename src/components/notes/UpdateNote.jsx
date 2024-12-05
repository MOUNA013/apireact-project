import React, { useState } from 'react';
import axios from 'axios';

const UpdateNote = ({ currentNote, setNotes, setIsEditing }) => {
  const [updatedTitle, setUpdatedTitle] = useState(currentNote.title);
  const [updatedContent, setUpdatedContent] = useState(currentNote.content);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      
      const response = await axios.put(
        `https://notes.devlop.tech/api/notes/${currentNote.id}`, 
        { title: updatedTitle, content: updatedContent }, 
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
      console.error('Error updating note:', error);
    }
  };

  return (
    <div  id="updateoteform">
      
        
        <label>
          Title:
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <input
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      
    </div>
  );
};

export default UpdateNote;
