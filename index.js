const http = require('http');
const httpProxy = require('http-proxy');

// Create the proxy server pointing to your localtunnel's internal hook
const proxy = httpProxy.createProxyServer({
    target: 'http://127.0.0.1:25565', 
    ws: true 
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Eaglercraft Bridge is Online!');
});

// Capture incoming secure WebSockets and stream them
server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Stream proxy active on port ${port}`);
});
