const http = require('http');
const route = require('./route');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/')
        route.home(req, res);
    else if (req.url === '/favicon.ico')
        route.notFound(req, res);
    else if (req.url ==='/text.html')
        route.text(req, res);
    else if (req.url === '/style.css')
        route.style(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

