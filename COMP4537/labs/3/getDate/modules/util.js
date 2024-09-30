
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
}

// Exports the two classes
module.exports = DateTimeRetriever;