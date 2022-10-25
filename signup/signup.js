const { firefox } = require('playwright');  // Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const { uniqueNamesGenerator, adjectives, colors, animals, NumberDictionary } = require('unique-names-generator');
var generator = require('generate-password');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile)
let $ = require('cheerio');
const prompt = require("prompt-async");

(async () => {
    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
    let name = uniqueNamesGenerator({
        dictionaries: [colors, adjectives, numberDictionary], // colors can be omitted here as not used
        separator: '',
        length: 3
    });
    let browser
    if (process.env.proxy) {
        browser = await firefox.launchPersistentContext("../session/" + name, {
            headless: false, proxy: {
                server: process.env.proxy
            }
        });
    }
    else {
        browser = await firefox.launchPersistentContext("../session/" + name, {
            headless: false
        });
    }
    const allPages = browser.pages();
    let email = await getEmail(allPages[0]);
    let cred = await creatCredentials(email);
    cred.name = name;
    try {
        await allPages[0].goto('https://twitch.tv', { timeout: 0 });
        await entertwitchcreds(allPages[0], cred);
    } catch {
        await allPages[0].screenshot({ path: "./errorImg/error___" + cred.name + ".png" });
        console.log("fail at signup");
        await browser.close()
        return false
    }
    //prompt.start();
    //const { cap } = await prompt.get(["y/n capatcha"]);
    await delay(5000)
    try {
        await verifyTwitch(allPages[0])
    } catch {
        await allPages[0].screenshot({ path: "./errorImg/error___" + cred.name + ".png" });
        console.log("prob capatcha");
        await browser.close()
        return false
    }

    let a = await getjson();
    let b = a.login;
    console.log(cred);
    b.push(cred)
    a.login = b;
    saveJSON(a)
    await browser.close()
})();

async function verifyTwitch(page) {
    await page.goto('https://temp-mail.org/en/', { timeout: 0 });
    await delay(10000);
    let temp$ = $.load(await page.content())
    console.log(temp$.toString().search("@"));
    let codeWithText = temp$('.inbox-dataList > ul:nth-child(1) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').attr('href');
    console.log(codeWithText);
    await page.goto(codeWithText, { timeout: 0 });
    await delay(20000);
    page.screenshot({ path: "./ass.png" });
    temp$ = $.load(await page.content())
    let selector = '.inbox-data-content-intro > div:nth-child(2) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > center:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > th:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > th:nth-child(1) > center:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)'
    codeWithText = temp$(selector).attr('href');
    await page.goto(codeWithText, { timeout: 0 });
    await delay(1000);
    //page.screenshot({ path: "./ass.png" });
    console.log(codeWithText);
    //#mailbox > div > div > div.col-md-6.ov-h.d_hide > a
    //#mailbox > div > div > div.col-md-6.ov-h.d_hide > a
}
async function getEmail(page) {
    await page.goto('https://temp-mail.org/en/', { timeout: 0 });
    await delay(10000);
    let clickselector = "button.btn-rds:nth-child(1)"
    await page.click(clickselector)
    await page.setContent(`<div contenteditable>123</div>`);
    await page.focus('div');
    const modifier = 'Control';
    await page.keyboard.press(`${modifier}+KeyC`);
    await page.keyboard.press(`${modifier}+KeyA`);
    await page.keyboard.press(`${modifier}+KeyV`);
    return page.evaluate(() => document.querySelector('div').textContent)
}
async function creatCredentials(email) {
    // name added later in index to set session name
    let name = false
    let pass = generator.generate({
        length: 10,
        numbers: true
    });
    console.log("email" + email);
    return { name: name, password: pass, email: email }
}
function delay(time) {
    time = time + getRandomArbitrary(400, 1200)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function entertwitchcreds(page, credobj) {
    await page.bringToFront()
    await delay(1000)
    await page.click('[data-a-target="consent-banner-accept"]')
    await delay(500)
    await page.click('[data-a-target="signup-button"]')
    await delay(5000)
    await page.type('[id="signup-username"]', credobj.name)
    await delay(500)
    await page.type('[id="password-input"]', credobj.password)
    await delay(500)
    await page.type('[id="password-input-confirmation"]', credobj.password)
    await delay(500)
    await page.click('[data-a-target="birthday-month-select"]')
    await delay(500)
    await page.keyboard.press('S');
    await page.keyboard.type('s');
    await delay(500)
    await page.type('[placeholder="Day"]', "1")
    await delay(500)
    await page.type('[placeholder="Year"]', "1999")
    await delay(500)
    // data-a-target="signup-phone-email-toggle"
    await page.click('[data-a-target="signup-phone-email-toggle"]')
    await delay(500)
    console.log("email:" + credobj.email);
    await page.type('[id="email-input"]', credobj.email)
    await delay(1000)
    await page.click('[data-a-target="passport-signup-button"]')
    await delay(2000)
}
async function getjson() {
    const res = await readFileAsync('../config.json')
    user = JSON.parse(res.toString());
    return user
}
async function saveJSON(json) {
    const data = JSON.stringify(json);
    // write JSON string to a file
    fs.writeFile('../config.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}
