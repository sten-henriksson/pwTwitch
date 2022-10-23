const prompt = require("prompt-async");
const WebSocket = require('ws')
const client = new WebSocket("ws:///localhost:8093")
let conenctedBots = false;
//send id
(async () => {
    prompt.start();
    // Start the prompt.
    while (true) {
        const { input } = await prompt.get(["input"]);
        console.log("Command-line input received: ");
        if (input == "ls") {
            console.table(conenctedBots);
        }
        if (input == "s") {
            // get read in viewbot and buffer is just passed thro backend to correct bot id
            client.send(JSON.stringify({ action: 0, data: "xqc", id: 0 }));
        }
    }
})();


client.on('message', function message(data) {
    try {
        if (data) {
            const payload = JSON.parse(data)
            conenctedBots = payload;
        }
    } catch (error) {

    }
});