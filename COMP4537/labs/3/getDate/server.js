const http = require('node:http');
const {URL} = require('node:url');
const DateTimeRetriever = require('C:/Class/COMP 4537 Internet Archi/comp4537 repo/COMP4537/labs/3/getDate/modules/util.js');
const MESSAGES = require('C:/Class/COMP 4537 Internet Archi/comp4537 repo/COMP4537/labs/3/getDate/lang/messages/en/user.js')

// '/COMP4537/labs/3/getDate/modules/'

class Server {
    constructor(port) {
        this.date = new DateTimeRetriever();
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    handleRequest(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const params = new URLSearchParams(url.search);
        const name = params.get('name');

        const message = MESSAGES.greetingMessage(name, this.date.getCurrentDateTime());

        // Set response headers
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });

        // Send the response
        res.end(`<p style="color: blue;">${message}</h1>`);
        }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

class main {
    constructor(port) {
        this.server = new Server(port);
        this.server.start();
    }
}

new main(8000)