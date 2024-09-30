/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 1

    The following code was generated with the help of ChatGPT:
    - ReadServer.readFile()

*/

const http = require('node:http');
const {URL} = require('node:url');
const fs = require('fs');
const path = require('node:path');


/**
 * ReadServer class
 * Reads entire content of file.txt and sends in a response
 */
class ReadServer {
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
        const requestedFile = path.parse(req.url).base;
        const filePath = path.join(__dirname, 'file.txt');
        if (requestedFile === 'file.txt') {
            this.readFile(filePath, res);
        } else {
            this.sendResponse(res, 404, 'Not Found');
        }


    }

    /**
     * Reads file and includes file data in response
     * 
     * @param {*} filePath path of the file to read
     * @param {*} res the HTTP response
     */
    readFile(filePath, res) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File does not exist
                    this.sendResponse(res, 404, `File not found: ${path.basename(filePath)}`);
                } else {
                    // Some other error occurred
                    this.sendResponse(res, 500, 'Error reading the file');
                }
            } else {
                // File exists, return its content
                this.sendResponse(res, 200, data);
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
        res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
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

const fileServer = new ReadServer(8000);
fileServer.start();
