const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;

let arr = [0];
let arrOut = [];
let arrRes = [];
const page404 = "<div style='background-color: #2ca5cd; width: 100%; height: 100%;'><h2 style='font-size: 6em; color: white; text-align: center; padding-top: 25vh;'>No Page Found</h2></div>";

const server = http.createServer(async (req, res) => {

    if (req.url === "/home" || req.url === "/") {
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
    else if (req.url === "/numbers") {
        fs.readFile("pages/numbers.html", "UTF-8", (err, data) => {
            if (err) {
                console.error(err);
                res.end('Ошибка!');
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }
    else if (req.url == "/desing") {

        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();

        arr.push(data);
        let middle = (+arr[arr.length - 1] + +arr[arr.length - 2]) / 2;
        arrOut = [arr[arr.length - 1], arr[arr.length - 2], middle];
        // console.log(arrOut);
        arrRes.push(arrOut);
        // console.log(arrRes);
        res.end(arrOut.join()); //отправка результата клиенту
    }
    else if (req.url == "/getNumber") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(JSON.stringify(arrRes));
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
        res.end(page404);
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен http://localhost:${PORT}`);
});

