// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
const WebSocket = require('ws')
const EventEmitter = require('node:events');
const client = new WebSocket("ws:///217.72.52.82:8092")
const emitter = new EventEmitter();
process.setMaxListeners(25);
emitter.setMaxListeners(25)
function heartbeat() {
   
    clearTimeout(client.pingTimeout);
    client.pingTimeout = setTimeout(() => {
        console.log("socket lost conn");
        console.log("lost socket conn terminating socket");
        client.terminate();
    }, 1800000 + 100000);
}
// start pupeteer on open




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
    console.log("starting" + process.env.user);
    client.on('open', heartbeat);
    client.on('ping', heartbeat);
    client.on('close', function clear() {
        clearTimeout(client.pingTimeout);
    });
    client.on('message', async function message(data) {
        console.log("browser", browser);
        if (!browser) {
            try {
                browser = await firefox.launchPersistentContext("../session/" + process.env.user, {
                    headless: true, proxy: {
                        server: process.env.proxy
                    }, viewport: { width: 548, height: 480 }, isMobile: true
                });
            } catch (error) {
                console.log(process.env.user, error);
            }
        }
        if (browser) {
            const allPages = browser.pages();
            messageHandler(data, allPages[0]);
        }
        else {
            console.log("fail at message handler");
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
            let a = goToTwitchChannel(page, "https://www.twitch.tv/" + payload.data)
            if (a == false) {
                return
            }
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
    console.log("screenshot");
    try {
        page.screenshot({ path: "./errorImg/" + process.env.user + ".png" });
    } catch (error) {
        console.log("oopsie no printscreen");
    }
}

async function goToTwitchChannel(page, url) {
    if (url == "https://www.twitch.tv/directory") {
        browser.close()
        browser = false;
        return
    }
    try {
        await page.goto(url, { timeout: 90000 });
        console.log("succses1 " + process.env.user);
    } catch {
        console.log("fail " + process.env.proxy + " " + process.env.user);
        await browser.close()
        return false
    }


    delay(9900)

    try {
        await page.click('[data-a-target="consent-banner-accept"]')
    } catch {
        console.log("cookie already clicked or glithced" + process.env.user);
    }

    try {
        await page.click('[data-a-target="player-overlay-play-button"]')
    } catch {
        console.log("no press play needed " + process.env.user);
    }
    try {
        await matureAudiance(page)
    } catch (error) {
        console.log("no mature audic");
    }
    await setQuality(page)
}

async function matureAudiance(page) {
    try {
        await page.click(".knaoBk > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)")
    } catch (error) {

    }
}
async function setQuality(page) {
    let noerror = false
    try {
        await page.hover("div.bzHxJi:nth-child(4) > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)")
        await page.click('div.bzHxJi:nth-child(4) > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)')
        await delay(900)
        await page.click('div.VqjQw:nth-child(3) > button:nth-child(1)')
        await delay(900)
        await page.click('div.Layout-sc-nxg1ff-0:nth-child(9) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > label:nth-child(2)')
        console.log("set quality");
    } catch (error) {
        console.log("failed setQuality");
        page.screenshot({ path: "./errorImg/" + process.env.user + ".png" });
    }
}