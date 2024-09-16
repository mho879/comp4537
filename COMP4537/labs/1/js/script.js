/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 1

    The following code was generated with the help of ChatGPT:
    - NoteManager.updateMostRecentTime()

*/


/**
 * Constants for HTML elements
 */
const ADD_NOTE_BUTTON_ID = 'addNote';
const NOTE_INPUT_FIELD_CLASS = 'noteInputField';
const NOTES_CONTAINER_ID = 'notesContainer';
const DIV_ELEMENT = 'div';
const USER_INPUT_ID = 'UserInput';
const BUTTON_ELEMENT = 'button';
const DELETE_TEXT = 'Delete'

/**
 * Constants for events
 */
const EVENT_CLICK = 'click';


class Note {
    constructor(id) {
        this.elementReference = null;
        this.userInputText = '';
        this.noteId = id;
        this.deleteButtonReference = null;
    }

    setUserInputText(newText) {
        this.userInputText = newText;
    }

    setElementReference(elementReference) {
        this.elementReference = elementReference;
    }

    setNoteId(noteId) {
        this.noteId = noteId;
    }

    getUserInputText() {
        return this.userInputText;
    }

    createDeleteButton(noteManager) {
        const deleteButtonReference = document.createElement(BUTTON_ELEMENT);
        deleteButtonReference.textContent = DELETE_TEXT;
        deleteButtonReference.addEventListener(EVENT_CLICK, () => {
            console.log(this.noteId);
            noteManager.deleteNote(this.noteId);
        });
        this.deleteButtonReference = deleteButtonReference;
    }

    setDeleteButton(deleteButtonElement) {
        this.deleteButtonReference = deleteButtonElement;
    }
}

/**
 * NoteManager class
 */
class NoteManager {
    constructor() {
        this.noteCollection = [];
        this.startAutoSave();
    }

    createNoteElement(noteId, noteText = '') {
        const noteElement = document.createElement('textarea');
        noteElement.className = NOTE_INPUT_FIELD_CLASS;
        noteElement.value = noteText;

        const newNote = new Note();
        newNote.setElementReference(noteElement);
        newNote.setNoteId(noteId);
        newNote.setUserInputText(noteText);
        this.createDeleteButton(newNote);

        const noteWrapper = document.createElement('div');
        noteWrapper.appendChild(noteElement);
        noteWrapper.appendChild(newNote.deleteButtonReference);

        document.getElementById(NOTES_CONTAINER_ID).appendChild(noteWrapper);
        this.noteCollection.push(newNote);
    }
    
    addNote() {
        const noteId = this.noteCollection.length;
        this.createNoteElement(noteId);
    }

    createDeleteButton(note) {
        const deleteButtonReference = document.createElement(BUTTON_ELEMENT);
        deleteButtonReference.textContent = DELETE_TEXT;
        deleteButtonReference.addEventListener(EVENT_CLICK, this.deleteNote(note.noteId));
        note.setDeleteButton(deleteButtonReference);
    }

    deleteNote(noteId) {
        return () => {
            const noteIndex = this.noteCollection.findIndex(note => note.noteId == noteId);
            if (noteIndex !== -1) {
                console.log(`NoteIndex: ${noteIndex}`)
                const note = this.noteCollection[noteIndex];
                note.elementReference.remove();
                note.deleteButtonReference.remove();
                this.noteCollection.splice(noteIndex, 1);
                this.updateStorage();
            }
        }
    }

    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        savedNotes.forEach((noteData) => {
            this.createNoteElement(noteData.noteId, noteData.userInputText);
        });
    }

    updateStoredText() {
        this.noteCollection.forEach(note => {
            note.setUserInputText(note.elementReference.value);
        });
    }

    updateStorage() {
        const notesData = this.noteCollection.map(note => ({
            noteId: note.noteId,
            userInputText: note.userInputText
        }));
        localStorage.setItem('notes', JSON.stringify(notesData));
    }

    updateMostRecentStoreTime() {
        const lastUpdateElement = document.getElementById('lastStore');
        lastUpdateElement.textContent = `Stored at: ${new Date().toLocaleTimeString()}`;
    }

    startAutoSave() {
        setInterval(() => {
            this.updateStoredText();
            this.updateStorage();
            this.updateMostRecentStoreTime();
        }, 2000);
    }
}


const myNoteManager = new NoteManager();
document.getElementById(ADD_NOTE_BUTTON_ID).addEventListener(EVENT_CLICK, () => {
    myNoteManager.addNote();
});

window.addEventListener('load', () => {
    myNoteManager.loadNotes();
    myNoteManager.updateMostRecentStoreTime();
});