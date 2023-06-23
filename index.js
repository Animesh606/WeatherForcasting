// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=ghatal&appid=ed933036b1742e5819eb041550a0d671
const http = require('http');
const fs = require('fs');
const port = process.env.port || 8000;
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        fs.readFile('home.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    else if(req.url == '/home.css'){
        fs.readFile('home.css', (err, data)=>{
            res.writeHeader(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });  
    }
    else if(req.url == '/home.js') {
        fs.readFile('home.js', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/js'});
            res.write(data);
            res.end();
        })
    }
    else
        res.end('<h1> Error 404 <\h1>');
});
server.listen(port, "127.0.0.1");