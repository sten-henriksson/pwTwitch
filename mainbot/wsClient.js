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
client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', function clear() {
    clearTimeout(this.pingTimeout);
});
ws.on('watchUser', function message(data) {
    console.log('received: %s', data);
});
ws.on('sendChat', function message(data) {
    console.log('received: %s', data);
});
ws.on('stopWatching', function message(data) {
    console.log('received: %s', data);
});
ws.on('open', function open() {
    // ws.send('something');
    // start pupeteer
    // kill pupeteer if ping dont go throu
});
