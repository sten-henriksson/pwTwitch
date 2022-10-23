const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8092 })
function heartbeat() {
  console.log("pong");
  this.isAlive = true;
}
let botid = 0;
wss.on('connection', function connection(ws) {
  console.log("connection");
  ws.botid = botid;
  botid++;
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});
const interval = setInterval(function ping() {
  console.log("start");
  wss.clients.forEach(function each(ws) {
    console.log(ws.botid);
    ws.isAlive = false;
    ws.send(JSON.stringify({ action: 0, data: "shroud" }))
  });
}, 13000);
// save sockets to array
// add ws.isWatching
wss.on('close', function close() {
  console.log("close");
  clearInterval(interval);
});