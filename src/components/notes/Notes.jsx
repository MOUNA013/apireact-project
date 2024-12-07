import axios from "axios";
import { useState, useEffect } from "react";
import CreateNote from "../CREATEOTE/CreateNote";
import DeleteNote from "../DELETENOTE/DeleteNote"; 
import UpdateNote from "../UPDATNOTE/UpdateNote"; 
import "./Notes.css";
import Logout from "../logout/logout";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentNote, setCurrentNote] = useState(null); 

  
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
  }, []);

  
  const handleCreateNote = () => {
    setClicked(true);
    
  };
    


  const handleEditNote = (note) => {
    setIsEditing(true);
    setCurrentNote(note); 
  };

  return (
    <div className="noteslist">
      <Logout/>
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
      {clicked && <CreateNote setNotes={setNotes} setClicked={setClicked} />}
      
      
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
