const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            const { name, email, subject, message } = formData;

            const dataToSave = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;

            fs.appendFile('form-data.txt', dataToSave, err => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Failed to save form data');
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Form data saved successfully');
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
