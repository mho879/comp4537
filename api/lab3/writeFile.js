/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 1

    The following code was generated with the help of ChatGPT:
    - WriteServer.appendToFile();

*/

const http = require('node:http');
const {URL} = require('node:url');
const fs = require('fs');

/**
 * WriteServer class
 * Checks for query field 'text' and writes values to file.txt
 */
class WriteServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    /**
     * Handles incomming HTTP (API) request
     * 
     * @param {*} req received request object
     * @param {*} res response object to return
     */
    handleRequest(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const textToAppend = url.searchParams.get('text');

        if (textToAppend) {
            this.appendToFile(textToAppend, res);
        }
    }

    /**
     * Appends accepted text to file.txt
     * 
     * @param {*} text the text to append to file
     * @param {*} res the response object
     */
    appendToFile(text, res) {
        fs.appendFile('file.txt', `${text}\n`, (err) => {
            if (err) {
                this.sendResponse(res, 500, 'Error appending text to file');
            } else {
                this.sendResponse(res, 200, `Appended "${text}" to file.txt`);
            }
        });
    }

    /**
     * Sends HTTP response
     * 
     * @param {*} res the response object to send
     * @param {number} statusCode the status code of the response to include in header
     * @param {string} message the message
     */
    sendResponse(res, statusCode, message) {
        res.writeHead(statusCode, {
            'Content-Type': 'text/plain'
        });
        res.end(message);
    }

    /**
     * Listens for the accepted port
     */
    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}

const fileServer = new WriteServer(8000);
fileServer.start();
