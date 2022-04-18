const { firefox } = require('playwright');  // Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const random_name = require('node-random-name');
var generator = require('generate-password');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile)
let $ = require('cheerio');

(async () => {
    const browser = await firefox.launchPersistentContext("./session/ggggqwe123", { headless: true });
    const allPages = browser.pages();
    console.log(allPages.length);
    try {
        await allPages[0].goto('https://twitch.tv', { timeout: 0 });
    } catch {
        await allPages[0].screenshot({ path: "./errorImg/error___" + "ass" + ".png" });
        console.log("fail");
        await browser.close()
        return false
    }
    delay(10000)
    try {
        await allPages[0].click('[data-a-target="consent-banner-accept"]')
    } catch {
        console.log("cookie clicked");
    }
    try {
        await allPages[0].click('[data-a-target="player-overlay-play-button"]')
    } catch {
        console.log("not p");
    }
    await allPages[0].screenshot({ path: "./errorImg/error___" + "ass" + ".png" });
})();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
async function getjson() {
    const res = await readFileAsync('config.json')
    user = JSON.parse(res.toString());
    return user
}
async function saveJSON(json) {
    const data = JSON.stringify(json);
    // write JSON string to a file
    fs.writeFile('config.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}
function delay(time) {
    time = time + getRandomArbitrary(400, 1200)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}