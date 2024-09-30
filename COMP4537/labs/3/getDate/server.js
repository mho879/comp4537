/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 1

    The following code was generated with the help of ChatGPT:


*/

const http = require('node:http');
const {URL} = require('node:url');
const {MessageDisplay, DateTimeRetriever} = require('./modules/util');
const BLUE_TEXT = '\x1b[34m';

// '/COMP4537/labs/3/getDate/modules/'

/**
 * Server class
 * Handles server creation and requests/responses
 */
class Server {
    constructor(language) {
        this.MessageHandler = new MessageDisplay(language);
        this.date = new DateTimeRetriever();
        // this.server = http.createServer(this.handleRequest.bind(this));
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

// /**
//  * Main class
//  * Drives the server
//  */
// class main {
//     constructor(port, language) {
//         this.server = new Server(port, language);
//         this.server.start();
//     }
// }

// new main(8000, 'en')

// const http = require('node:http');
// const { URL } = require('node:url');
// const { MessageDisplay, DateTimeRetriever } = require('./modules/util.js'); // Adjusted to relative path
// const BLUE_TEXT = '\x1b[34m';

// /**
//  * Handles incoming HTTP requests
//  * 
//  * @param {*} req received request object
//  * @param {*} res response object to return
//  */
// const handleRequest = (req, res) => {
//     const url = new URL(req.url, `https://${req.headers.host}`); // Use 'https' for Vercel
//     const params = new URLSearchParams(url.search);
//     const name = params.get('name');
//     const message = new MessageDisplay('en').getFunctionMessage('greetingMessage', [name, new DateTimeRetriever().getCurrentDateTime()]);

//     res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8',
//     });

//     res.end(BLUE_TEXT + message);
// };

// // Vercel serverless function handler
// module.exports = (req, res) => {
//     if (req.method === 'GET') {
//         handleRequest(req, res);
//     } else {
//         res.writeHead(405, { 'Content-Type': 'text/plain' });
//         res.end('Method Not Allowed');
//     }
// };
