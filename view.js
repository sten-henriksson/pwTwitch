// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
const prompt = require("prompt-async");
(async () => {
    prompt.start();
    const { arraynr } = await prompt.get(["arraynr"]);
    let session = await getjson();
    session = session.login[arraynr].name
    console.log(session);
    const browser = await firefox.launchPersistentContext("./session/" + session, {
        headless: true, proxy: {
            server: 'http://45.13.31.218:12554',
            username: "proxyfish154",
            password: "darkdark",
        },
    });
    const allPages = browser.pages();
    console.log(allPages.length);
    try {
        await allPages[0].goto('https://twitch.tv/akkeoh', { timeout: 0 });
    } catch {
        await allPages[0].screenshot({ path: "./errorImg/error___" + session + ".png" });
        console.log("fail");
        await browser.close()
        return false
    }
    delay(3000)
    await allPages[0].screenshot({ path: "./viewingImg/" + session + "1.png" });
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
    await allPages[0].screenshot({ path: "./viewingImg/" + session + "2.png" });
    prompt.start();
    const { cap } = await prompt.get(["any key to kill myself"]);
    await browser.close();
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