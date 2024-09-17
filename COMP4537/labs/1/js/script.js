/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 1

    The following code was generated with the help of ChatGPT:
    - NoteManager.updateMostRecentTime()
    - If condition for what HTML page the DOM is on (line 223)

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
const TEXT_AREA = 'textarea';
const LAST_STORE_ID = 'lastStore';
const NOTE_WRAPPER_CLASS = 'noteWrapper';
const DELETE_CLASS = 'deleteButton'

/**
 * Constants for events
 */
const EVENT_CLICK = 'click';
const EVENT_LOAD = 'load';

/**
 * Constants for message Keys
 */
const LAST_STORED = 'lastStoreMessage';

class Note {
    constructor(id) {
        this.elementReference = null;
        this.userInputText = '';
        this.noteId = id;
        this.deleteButtonReference = null;
    }

    /**
     * Setter for this.userInputText
     * 
     * @param {string} newText the text inputted by user
     */
    setUserInputText(newText) {
        this.userInputText = newText;
    }

    /**
     * Setter for this note's reference to the textarea element
     * 
     * @param {Element} elementReference 
     */
    setElementReference(elementReference) {
        this.elementReference = elementReference;
    }

    /**
     * Setter for this.noteId
     *
     * @param {number} noteId 
     */
    setNoteId(noteId) {
        this.noteId = noteId;
    }

    /**
     * Getter for this.userInputText
     * 
     * @returns the text stored in this object
     */
    getUserInputText() {
        return this.userInputText;
    }

    /**
     * Set this.deleteButtonReference
     * 
     * @param {*} deleteButtonElement reference to the button to store
     */
    setDeleteButton(deleteButtonElement) {
        this.deleteButtonReference = deleteButtonElement;
    }
}

/**
 * NoteManager class
 */
class NoteManager {
    constructor(language) {
        this.noteCollection = [];
        this.MessageHandler = new MessageDisplay(language);
        this.startAutoSave();
    }

    /**
     * Create note element add it to the DOM and this NoteManager
     * 
     * @param {*} noteId id of the note object
     * @param {*} noteText text stored in the note object
     */
    createNoteElement(noteId, noteText = '') {
        const noteElement = document.createElement(TEXT_AREA);
        noteElement.className = NOTE_INPUT_FIELD_CLASS;
        noteElement.value = noteText;

        const newNote = new Note();
        newNote.setElementReference(noteElement);
        newNote.setNoteId(noteId);
        newNote.setUserInputText(noteText);
        this.createDeleteButton(newNote);
        if (window.location.pathname.endsWith('reader.html')) {
            noteElement.setAttribute('readonly', true);
        }

        const noteWrapper = document.createElement(DIV_ELEMENT);
        noteWrapper.className = NOTE_WRAPPER_CLASS;
        noteWrapper.appendChild(noteElement);
        noteWrapper.appendChild(newNote.deleteButtonReference);

        document.getElementById(NOTES_CONTAINER_ID).appendChild(noteWrapper);
        this.noteCollection.push(newNote);
    }
    
    /**
     * Adds a note to the DOM and this NoteManager
     */
    addNote() {
        const noteId = this.noteCollection.length;
        this.createNoteElement(noteId);
    }

    /**
     * Creates a delete button for the note
     * 
     * @param {Note} note the note object to attach the delete button to
     */
    createDeleteButton(note) {
        const deleteButtonReference = document.createElement(BUTTON_ELEMENT);
        deleteButtonReference.textContent = DELETE_TEXT;
        deleteButtonReference.className = DELETE_CLASS;
        deleteButtonReference.addEventListener(EVENT_CLICK, this.deleteNote(note.noteId));
        note.setDeleteButton(deleteButtonReference);
    }

    /**
     * Returns an event handler for the delete button
     * 
     * @param {*} noteId the id of the note for the event handler
     * @returns the delete note event hanlder
     */
    deleteNote(noteId) {
        return () => {
            const noteIndex = this.noteCollection.findIndex(note => note.noteId == noteId);
            if (noteIndex !== -1) {
                const note = this.noteCollection[noteIndex];
                note.elementReference.remove();
                note.deleteButtonReference.remove();
                this.noteCollection.splice(noteIndex, 1);
                this.updateStorage();
            }
        }
    }

    /**
     * Loads notes from local storage and updates the DOM
     */
    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        savedNotes.forEach((noteData) => {
            this.createNoteElement(noteData.noteId, noteData.userInputText);
        });
    }

    /**
     * Updates the stored text within each note object stored in this.noteCollection
     */
    updateStoredText() {
        this.noteCollection.forEach(note => {
            note.setUserInputText(note.elementReference.value);
        });
    }

    /**
     * Updates the JSON within local storage with the current notes on the DOM
     */
    updateStorage() {
        const notesData = this.noteCollection.map(note => ({
            noteId: note.noteId,
            userInputText: note.userInputText
        }));
        localStorage.setItem('notes', JSON.stringify(notesData));
    }

    /**
     * Updates the timer on the screen representing the most recent time the notes have beend saved
     */
    updateMostRecentStoreTime() {
        const lastUpdateElement = document.getElementById(LAST_STORE_ID);
        if (this.MessageHandler.messages != null) {
            lastUpdateElement.textContent = `${this.MessageHandler.messages[LAST_STORED]} ${new Date().toLocaleTimeString()}`;
        } else {
            lastUpdateElement.textContent = new Date().toLocaleTimeString();
        }
    }

    /**
     * Starts the auto save process that occurs every 2 seconds
     */
    startAutoSave() {
        setInterval(() => {
            this.updateStoredText();
            this.updateStorage();
            this.updateMostRecentStoreTime();
        }, 2000);
    }
}


/**
 * MessageDisplay class
 * Manages the various messages to display
 */
class MessageDisplay {
    constructor(language){
        this.language = language;
        this.messages = null;
        this.init();
    }

    /**
     * Loads messages from user.js in resppective language folder in lang/messages
     * 
     * @returns the default exports from a user.js file
     */
    async loadMessages() {
        const modulePath = `/COMP4537/labs/1/lang/messages/${this.language}/user.js`;
        try {
            const module = await import(modulePath);
            return module.default;
        } catch (error) {
            console.error("Error loading module:", error);
            throw error;
        }
    }
    
    /**
     * Initializes loadMessages() and handles the Promise
     */
    async init() {
        try {
            this.messages = await this.loadMessages();
        } catch (error) {
            console.error("Error loading messages in MessageDisplay:", error);
        }
    }

    /**
     * Returns the message associate with the message key
     * 
     * @param {*} messageKey 
     */
    getMessage(messageKey) {
        console.log(this.messages[messageKey]);
        return this.messages[messageKey];
    }

}


/**
 * NoteManagerController class
 */
class NoteManagerController {
    constructor() {
        this.noteManager = new NoteManager(document.documentElement.lang);
        this.initializeEventListeners();
    }

    /**
     * Starts Event Listeners
     */
    initializeEventListeners() {
        // Add note button only for writer.html
        if (window.location.pathname.endsWith('writer.html')) {
            document.getElementById(ADD_NOTE_BUTTON_ID).addEventListener(EVENT_CLICK, () => {
                this.noteManager.addNote();
            });
        }

        // Load notes on page load
        window.addEventListener(EVENT_LOAD, () => {
            this.noteManager.loadNotes();
            this.noteManager.updateMostRecentStoreTime();
        });

        // Listen for changes to to localStorage
        window.addEventListener('storage', (event) => {
            if (event.key === 'notes') {
                const notesContainer = document.getElementById(NOTES_CONTAINER_ID);
                notesContainer.innerHTML = '';

                this.noteManager.noteCollection = [];
                this.noteManager.loadNotes();
            }
        });
    }
}


const myNoteManagerController = new NoteManagerController();


