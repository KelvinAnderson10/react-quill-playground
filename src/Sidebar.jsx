import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';

Quill.register('modules/imageResize', ImageResize);

const Sidebar = () => {
    const [notes, setNotes] = useState([]);

    // Function to add a new note
    const addNote = () => {
        const newNote = {
            content: '', // Initial content of the note
            preview: 'New Note', // Default preview
        };

        setNotes([...notes, newNote]);
    };

    // Function to update note content
    const updateNoteContent = (index, content) => {
        const updatedNotes = [...notes];
        updatedNotes[index].content = content;
        updatedNotes[index].preview = generatePreview(content);
        console.log("konten", content);
        setNotes(updatedNotes);
    };

    // Function to generate a preview from note content
    const generatePreview = (content) => {
        // Create a temporary DOM element to extract text
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;

        // Extract text content and truncate if necessary
        let preview = tempElement.innerText.trim();
        if (preview.length > 30) {
            preview = preview.substring(0, 20) + '...';
        }

        return preview;
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image'],
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize']
        }
    }

    return (
        <div className="sidebar">
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        <ReactQuill
                            placeholder='Write your new diary here'
                            theme="snow"
                            modules={modules}
                            value={note.content}
                            onChange={(content) => updateNoteContent(index, content)}
                        />
                        <div>{note.preview}</div> {/* Display the preview */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
