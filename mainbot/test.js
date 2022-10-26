// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
(async () => {
    //const browser = await firefox.launchPersistentContext("./session/" + "rejag62184");
    const browser = await firefox.launchPersistentContext("../session/" + "fuchsiarural2", {
       headless: false //, proxy: {
           // server: "154.53.82.109:8800"
        //}
    });
    const allPages = browser.pages();
    console.log("starting" + process.env.user);
    /*
    try {
        await allPages[0].goto('https://twitch.tv/akkeoh', { timeout: 0 });
        console.log("succses1");
    } catch {
        console.log("fail");
        await browser.close()
        return false
    }
    console.log("succses2");
    delay(3000)
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
    console.log("end");
    */
})();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function delay(time) {
    time = time + getRandomArbitrary(400, 1200)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}