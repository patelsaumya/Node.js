const http = require('http');
const requestHandler = require('./routes');

// Event-Driven Architecture
const server = http.createServer(requestHandler);
// requestHandler will get executed for every incoming requests

server.listen(3000); // default: localhost