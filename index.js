const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;

const server = http.createServer(function (req, res) {
    console.log(req.url)

    if (req.url === "/home") {
        fs.readFile("pages/my-cv.html", "UTF-8", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    }
    else if (req.url === "/messages") {
        fs.readFile("pages/messages.html", "UTF-8", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    }
    else if (req.url.match("\.css$")) {
        const cssPath = path.join(__dirname, 'pages', req.url);
        const fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);

    } else if (req.url.match("\.jpg$")) {
        const imagePath = path.join(__dirname, 'pages', req.url);
        const fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/jpg" });
        fileStream.pipe(res);

    }
    else if (req.url.match("\.ico$")) {
        const iconPath = path.join(__dirname, 'pages', req.url);
        const fileStream = fs.createReadStream(iconPath);
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fileStream.pipe(res);

    }

    else if (req.url.match("\.js$")) {
        const jsPath = path.join(__dirname, 'pages', req.url);
        const fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, { "Content-Type": "application/javascript" });
        fileStream.pipe(res);

    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>No Page Found</h2>");
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен http://localhost:${PORT}`);
});

