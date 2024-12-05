import axios from "axios";
import { useState, useEffect } from "react";
import CreateNote from "../CREATEOTE/CreateNote";
import DeleteNote from "./DeleteNote"; 
import UpdateNote from "./UpdateNote"; 
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [currentNote, setCurrentNote] = useState(null); // State to store the note being edited

  
  const getNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("https://notes.devlop.tech/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, [notes]);

  
  const handleCreateNote = () => {
    setClicked(true);
    
  };
    


  const handleEditNote = (note) => {
    setIsEditing(true);
    setCurrentNote(note); 
  };

  return (
    <div className="noteslist">
      <h1>Les Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <div className="note">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
            <button id="deletebutton"  onClick={() => handleEditNote(note)}>Edit</button> 
            <DeleteNote noteId={note.id} setNotes={setNotes} /> 
          </li>
        ))}
      </ul>
      <button id="creatbutton" onClick={handleCreateNote}>+</button>
      {clicked && <CreateNote setNotes={setNotes} />}
      
      
      {isEditing && currentNote && (
        <UpdateNote
          currentNote={currentNote}
          setNotes={setNotes}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Notes;
