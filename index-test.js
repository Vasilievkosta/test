const http = require('http');
const fs = require('fs');
const PORT = 8080;
const { fd, sd } = ddd();


const server = http.createServer((req, res) => {
	switch (req.url) {
		case '/home': {
			const data = fs.readFileSync('pages/my-cv.html');
			res.setHeader('Content-Type', 'text/html; charset=utf-8;');
			res.write(data);
			res.end();
			break;
		}
		case '/now': {
			res.end(new Date().toString());
			break;
		}

		default: {
			res.setHeader('Content-Type', 'text/html; charset=utf-8;');
			res.end('<h2>404 not found</h2>');
		}
	}
	res.end();
});

server.listen(PORT, () => {
	console.log(`Тестовый сервер на портру ${PORT}`);
});