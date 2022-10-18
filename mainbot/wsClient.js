const WebSocket = require('ws')
const client = new WebSocket("ws:///localhost:8092")
// add to terminate connection if pupetter hangs up and in every try/catch
function heartbeat() {
    // rewrite to work with pupeteer
    console.log("ping");
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
        this.terminate();
        //kill pupeteer 
    }, 30000 + 1000);
}
// start pupeteer on open
client.on('message', function message(data) {
    const payload = JSON.parse(data)
    console.log("payload", typeof payload);
    if (!payload.data) {
        console.log("invalid payload");
        return
    }
    switch (payload.action) {
        case 0:
            // watch user
            console.log(payload);
            break;
        case 1:
            // send message
            console.log(payload);
            break;
        case 2:
            // stop watching
            console.log(payload);
            break;
        default:
    }
});
/*
client.on('watchUser', function message(data) {
    console.log('received: %s', data);
});
client.on('sendChat', function message(data) {
    console.log('received: %s', data);
});
client.on('stopWatching', function message(data) {
    console.log('received: %s', data);
});
client.on('open', function open() {
    console.log("client open");
    // ws.send('something');
    // start pupeteer
    // kill pupeteer if ping dont go throu
});
*/