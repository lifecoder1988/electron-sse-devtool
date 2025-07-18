const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    let id = 0;
    const intervalId = setInterval(() => {
      const message = `data: ${JSON.stringify({ message: 'Hello from server!', timestamp: new Date() })}\n`;
      res.write(`id: ${id++}\n`);
      res.write(message + '\n');
    }, 2000);

    req.on('close', () => {
      clearInterval(intervalId);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('SSE server running on http://localhost:3000');
});