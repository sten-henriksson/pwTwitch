// save sockets with username
// send socket name on get
// send action for socket chat() view() idle() and save to socket object current status
// 2 websocket servers 1 for bots and 1 for frontend 
const WebSocket = require('ws')
const frontendServer = new WebSocket.Server({ port: 8092 })
const botSocketServer = new WebSocket.Server({ port: 8092 })

function getBots() {
    return botSocketServer.clients.map(x => x.id)
}
// interval emits bots for frontend
setInterval(() => {
    frontendServer.clients.forEach(function each(ws) {
        console.log(ws.isAlive);
        if (ws.isAlive === false) return ws.terminate();
        ws.send(JSON.stringify(getBots()));
    });
}, 1000);
frontendServer.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        // data = {id=0,action=0, data="link"}
        console.log('received: %s', data);
        const payload = JSON.parse(data)
        let soc = getSocketfromID(payload.id);
        // pass socket message to correct bot socket
        soc.send(data);
    });
    ws.send('something');
});

function getSocketfromID(id) {
    let socket
    botSocketServer.clients.forEach(function each(ws) {
        console.log(ws.isAlive);
        if (ws.id == id) {
            socket = ws
        }
    });
    return socket
}