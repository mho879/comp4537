const http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text'});
    res.end('Hello <b>World!</b>');
}).listen(5000);

console.log('Server is running and listening');