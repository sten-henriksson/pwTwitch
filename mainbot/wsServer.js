const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8092 })
function heartbeat() {
  console.log("pong");
  this.isAlive = true;
}
wss.on('connection', function connection(ws) {
  console.log("connection");
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    console.log(ws.isAlive);
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
    ws.send(JSON.stringify({ action: 0, data: "shroud" }))
  });
}, 1000);
// save sockets to array
// add ws.isWatching
wss.on('close', function close() {
  console.log("close");
  clearInterval(interval);
});