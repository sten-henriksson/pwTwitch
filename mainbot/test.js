// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
(async () => {
    //const browser = await firefox.launchPersistentContext("./session/" + "rejag62184");
    const browser = await firefox.launchPersistentContext("../session/" + "hasdasdada", {
        headless: false //, proxy: {
        // server: "154.53.82.109:8800"
        //}
    });
    const allPages = browser.pages();
    console.log("starting" + process.env.user);

    try {
        await allPages[0].goto('https://www.twitch.tv/tommykaylive', { timeout: 0 });
        console.log("succses1");
        await allPages[0].waitForNavigation();
    } catch {
        console.log("fail");
        //await browser.close()
        return false
    }
    let page = allPages[0]
    console.log("succses2");
    await delay(3000)
    try {
        await matureAudiance(allPages[0])
        await setQuality(allPages[0])
    } catch {
        console.log("cookie clicked");
    }
    try {
        await allPages[0].click('[data-a-target="player-overlay-play-button"]')
    } catch {
        console.log("not p");
    }
    await delay(500)
    console.log("end");
})();

async function matureAudiance(page) {
    try {
        await page.click(".knaoBk > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)")
    } catch (error) {

    }
}
async function setQuality(page) {
    let noerror = false
    while (true) {
        try {
            await page.hover("div.bzHxJi:nth-child(4) > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)")
            await page.click('div.bzHxJi:nth-child(4) > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)')
            await delay(900)
            await page.click('div.VqjQw:nth-child(3) > button:nth-child(1)')
            await delay(900)
            await page.click('div.Layout-sc-nxg1ff-0:nth-child(9) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > label:nth-child(2)')
            break;
        } catch (error) {
            console.log("failed setQuality");
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function delay(time) {
    time = time + getRandomArbitrary(400, 1200)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}