// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
const WebSocket = require('ws')
const client = new WebSocket("ws:///localhost:8092")

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
    browser = await firefox.launchPersistentContext("./session/testsession"/* + process.env.user, {
        headless: true, proxy: {
            server: process.env.proxy
        }
    }*/);

    const allPages = browser.pages();
    const page = allPages[0]
    console.log("starting" + process.env.user);

    console.log("end");
});

async function messageHandler(data) {

    const payload = JSON.parse(data)
    if (!payload.action) {
        console.log("invalid payload");
        return
    }

    if (!payload.data) {
        console.log("invalid payload");
        return
    }

    switch (payload.action) {

        case 0:
            // watch user
            console.log(payload);
            goToTwitchChannel(page, "https://www.twitch.tv/" + payload.data)
            break;

        case 1:
            // send message
            console.log(payload);
            break;

        case 2:
            // stop watching
            goToTwitchChannel(page, "https://www.twitch.tv/directory")
            console.log(payload);
            break;

        default:
    }
}

async function goToTwitchChannel(page, url) {

    try {
        await page.goto(url, { timeout: 0 });
        console.log("succses1");
    } catch {
        console.log("fail");
        await browser.close()
        return false
    }

    console.log("succses2");
    delay(3000)

    try {
        await page.click('[data-a-target="consent-banner-accept"]')
    } catch {
        console.log("cookie already clicked or glithced");
    }

    try {
        await page.click('[data-a-target="player-overlay-play-button"]')
    } catch {
        console.log("not p");
    }

}

