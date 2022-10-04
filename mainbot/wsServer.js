const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8092 })
function heartbeat() {
  console.log("pong");
  this.isAlive = true;
}
wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
// save sockets to array
// add ws.isWatching
wss.on('close', function close() {
  clearInterval(interval);
});