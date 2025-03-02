/*
    Marco Ho (Set T)
    A01338160
    COMP 4537 Lab 1

    The following code was generated with the help of ChatGPT:
    - WriteServer.appendToFile();
    - WriteServer.appendToS3();

*/

const http = require('node:http');
const {URL} = require('node:url');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2'
})

/**
 * WriteServer class
 * Checks for query field 'text' and writes values to file.txt
 */
class WriteServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));

        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-west-2'
        })
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
            this.appendToS3(textToAppend, res);
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
     * Appends accepted text to file.txt located in S3 bucket
     * 
     * @param {*} text the text to append to file
     * @param {*} res the response object
     */
    appendToS3(text, res) {
        const params = {
            Bucket: 'comp4537-lab3-mho',
            Key: 'file.txt',
        };

        // Try to get the existing file from S3
        this.s3.getObject(params, (err, data) => {
            let newData = text; // Initialize with new text to append

            if (!err) {
                // If the file exists, append the existing content to the new text
                newData = data.Body.toString('utf-8') + '\n' + text;
            } else if (err.code !== 'NoSuchKey') {
                // Handle other errors that are not "file not found"
                return this.sendResponse(res, 500, 'Error retrieving the file from S3');
            }

            // Now upload the updated content back to S3
            const uploadParams = {
                Bucket: params.Bucket,
                Key: params.Key,
                Body: newData
            };

            this.s3.upload(uploadParams, (uploadErr) => {
                if (uploadErr) {
                    this.sendResponse(res, 500, 'Error appending text to file.txt in S3');
                } else {
                    this.sendResponse(res, 200, `Appended "${text}" to file.txt in S3.`);
                }
            });
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
