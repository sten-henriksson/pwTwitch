// save sockets with username
// send socket name on get
// send action for socket chat() view() idle() and save to socket object current status
// 2 websocket servers 1 for bots and 1 for frontend 
const WebSocket = require('ws')
const frontendServer = new WebSocket.Server({ port: 8093 })
const botSocketServer = new WebSocket.Server({ port: 8092 })
let botid = 0;
function getBots() {
    let arr = []
    botSocketServer.clients.forEach(function each(ws) {
        arr.push({ id: ws.id, lastAction: ws.lastAction })
    });
    return arr
}
// interval emits bots for frontend
setInterval(() => {
    frontendServer.clients.forEach(function each(ws) {
        console.log(ws.isAlive);
        if (ws.isAlive === false) return ws.terminate();
        console.log(getBots());
        try {
            ws.send(JSON.stringify(getBots()));
        } catch (error) {
            ws.send(JSON.stringify(["no bots connected"]))
        }
        //ws.send("ass")
        console.log("send");
    });
}, 5000);
frontendServer.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        const payload = JSON.parse(data)
        let soc = getSocketfromID(payload.id);
        console.log(payload.data);
        soc.lastAction = payload.data
        // pass socket message to correct bot socke
        soc.send(data);
    });
    ws.send(JSON.stringify(getBots()));
})
botSocketServer.on('connection', function connection(ws, req) {
    console.log("connection", botid);
    ws.id = req.socket.remoteAddress + "id:" + botid;
    ws.lastAction = "directory"
    botid++;
});
function getSocketfromID(id) {
    let socket
    botSocketServer.clients.forEach(function each(ws) {
        if (ws.id == id) {
            socket = ws
        }
    });
    return socket
}
