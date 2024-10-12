/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 3

    The following code was generated with the help of ChatGPT:


*/

const http = require('node:http');
const {URL} = require('node:url');
const {MessageDisplay, DateTimeRetriever} = require('./modules/util');
const BLUE_TEXT = '\x1b[34m';

/**
 * Server class
 * Handles server creation and requests/responses
 */
class Server {
    constructor(language) {
        this.MessageHandler = new MessageDisplay(language);
        this.date = new DateTimeRetriever();
    }

    /**
     * Handles incomming HTTP (API) request
     * 
     * @param {*} req received request object
     * @param {*} res response object to return
     */
    handleRequest(req, res) {
        const url = new URL(req.url, `https://${req.headers.host}`);
        const params = new URLSearchParams(url.search);
        const name = params.get('name');
        const message = this.MessageHandler.getFunctionMessage('greetingMessage', [name, this.date.getCurrentDateTime()]);

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });

        res.end(BLUE_TEXT + message);
    }
    
    /**
     * Listens for the accepted port
     */
    start() {
        const port = process.env.PORT || 8000;
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

// Export a function to handle requests
module.exports = (req, res) => {
    const server = new Server('en');
    server.handleRequest(req, res);
};
