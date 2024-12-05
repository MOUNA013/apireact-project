// DeleteNote.js
import axios from "axios";
import { useState } from "react";

function DeleteNote({ noteId, setNotes }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    setIsDeleting(true); // Show loading state

    try {
      // Send DELETE request to API
      await axios.delete(`https://notes.devlop.tech/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the notes state in parent component
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false); // Hide loading state
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
