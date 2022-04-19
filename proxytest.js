
const { firefox } = require('playwright');  // Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const random_name = require('node-random-name');
var generator = require('generate-password');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile)
let $ = require('cheerio');

(async () => {
    
    const browser = await firefox.launchPersistentContext("./session/ggggqwe123", {
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
        await allPages[0].screenshot({ path: "./errorImg/error___" + "ass" + ".png" });
        console.log("fail");
        //await browser.close()
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