// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
const WebSocket = require('ws')
const client = new WebSocket("ws:///217.72.52.82:8092")

function heartbeat() {
    console.log("pong");
    clearTimeout(client.pingTimeout);
    client.pingTimeout = setTimeout(() => {
        client.terminate();
    }, 30000 + 1000);
}
// start pupeteer on open
client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', function clear() {
    clearTimeout(client.pingTimeout);
});



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function delay(time) {
    time = time + getRandomArbitrary(400, 1200)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

let alive = false;
let browser

client.on('open', async function open() {

    alive = true;
    browser = await firefox.launchPersistentContext("../session/" + process.env.user, {
        headless: true, proxy: {
            server: process.env.proxy
        }
    });
    console.log("starting" + process.env.user);
    const allPages = browser.pages();
    client.on('message', function message(data) {
        if (browser) {
            messageHandler(data, allPages[0]);
        }
        else {
            console.log("browser dont start");
        }
    });
});

async function messageHandler(data, page) {

    const payload = JSON.parse(data)
    if (!payload.data) {
        console.log("invalid payload");
        return
    }

    switch (payload.action) {

        case 0:
            // watch user
            console.log(payload + process.env.user);
            goToTwitchChannel(page, "https://www.twitch.tv/" + payload.data)
            break;

        case 1:
            // send message
            console.log(payload + process.env.user);
            break;

        case 2:
            // stop watching
            goToTwitchChannel(page, "https://www.twitch.tv/directory")
            console.log(payload + process.env.user);
            break;

        default:
    }
    await delay(90000)
    page.screenshot({ path: "./" + process.env.user + ".png" });
}

async function goToTwitchChannel(page, url) {
    try {
        await page.goto(url, { timeout: 90000 });
        console.log("succses1" + process.env.user);
    } catch {
        console.log("fail" + process.env.proxy + " " + process.env.user);
        await browser.close()
        return false
    }

    console.log("succses2");
    delay(3000)

    try {
        await page.click('[data-a-target="consent-banner-accept"]')
    } catch {
        console.log("cookie already clicked or glithced" + process.env.user);
    }

    try {
        await page.click('[data-a-target="player-overlay-play-button"]')
    } catch {
        console.log("not p" + process.env.user);
    }
}

