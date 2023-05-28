const fs = require('fs');

function requestHandler(req, res) {
    // req.url -> everything after our host
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        // res.write('<body><form action="/message" method="POST"><input type="text" name="message1"><input type="text" name="message2"><button type="submit">Send</button></form></body>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        // form will automatically send the request where it takes all the input data and puts it into
        // the request body as key-value pairs where the names assigned to the inputs are the keys
        // and the values are what the user entered and that is what we have here
        res.write('</html>');
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // event listener

            // STREAMS
            // function will be called when 'data' event is fired
            // Node.js will execute this so often until it's done getting all the data out of our request;

            // console.log(chunk);
            body.push(chunk);
        }); // 'data' event will be fired whenever a new chunk is ready to be read
        return req.on('end', () => {
            // BUFFERS
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {
                // will be executed once the task related to file is completed
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        }); // 'end' event will be fired once it's done parsing the incoming request's data
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    return res.end(); // send the response back to the client
}

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hardcoded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hardcoded text';

// exports.handler = requestHandler;
// exports.someText = 'Some hardcoded text';