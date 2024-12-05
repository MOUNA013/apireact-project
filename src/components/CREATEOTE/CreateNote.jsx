import axios from "axios";
import { useState } from "react";
import "./CreateNote.css"


function CreateNote({ setNotes }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const noteData = {
            title,
            content,
        };

        try {
           
            const response = await axios.post("https://notes.devlop.tech/api/notes", noteData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            
            setNotes((prevNotes) => [...prevNotes, response.data]); // Add the newly created note to the list

            
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };
    

    return (
        <form id="addnoteform" onSubmit={handleSubmit}>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
            />
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note Content"
            />
            <button type="submit" >Save Note</button>
        </form>
    );
}

export default CreateNote;
