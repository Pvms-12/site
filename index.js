const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 7777;

const requestListener = (req, res) => {
  if (req.url === '/') {
    fs.readFile('examples/mainpage.html', 'UTF-8', function (err, html) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  } else if (req.url.match('.mid$|.gif$.|.jpg$')) {
    const imagePath = path.join(__dirname, 'assets', req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    fileStream.pipe(res);
  } else if (req.url.match('.css$')) {
    var cssPath = path.join(__dirname, 'styles', req.url);
    var fileStream = fs.createReadStream(cssPath, 'UTF-8');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fileStream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('No Page Found');
  }
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
