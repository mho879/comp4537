// MESSAGES_FILE_PATH = '/COMP4537/labs/3/getDate/lang/messages/'
MESSAGES_FILE_PATH = '../lang/messages/'

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
        const modulePath = `${MESSAGES_FILE_PATH}${this.language}/user.js`;
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
     * Returns the message associated with the message key
     * 
     * @param {string} messageKey the key value of the desired message stored within this.messsages
     */
    getMessage(messageKey, firstArg, secondArg) {
        let message = this.messages[messageKey];
        return message;
    }

    /**
     * Returns the message function asscoiated with the message key
     * 
     * @param {string} messageKey the key value of the desired message stored within this.messsages
     * @param {string[]} args the arguments to pass to the message
     */
    getFunctionMessage(messageKey, args) {
        let message = this.messages[messageKey];
        return message(args);
    }

}

/**
 * DateTimeRetriever class
 * Stores an instance of Date()
 */
class DateTimeRetriever {
    constructor() {
        this.date = new Date();
    }
    
    getCurrentDateTime() {
        return this.date;
    }

    getCurrentDateTimeAsAString() {
        return this.date.toString();
    }
}

// Exports the two classes
module.exports = { MessageDisplay, DateTimeRetriever};