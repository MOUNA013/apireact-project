import axios from "axios";
import { useState } from "react";

function DeleteNote({ noteId, setNotes }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    setIsDeleting(true); 

    try {
     
      await axios.delete(`https://notes.devlop.tech/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false); 
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="delete-button"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteNote;
