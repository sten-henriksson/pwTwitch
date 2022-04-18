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
    await allPages[0].goto('https://app.getmailet.com/guest', { timeout: 0 });
    let cred = await creatCredentials(allPages[0]);
    try {
        await allPages[0].goto('https://twitch.tv', { timeout: 0 });
        await entertwitchcreds(allPages[0], cred);
    } catch {
        await allPages[0].screenshot({ path: "./errorImg/error___" + cred.name + ".png" });
        console.log("fail at signup");
        await browser.close()
        return false
    }
    await delay(10000);
    try {
        await allPages[0].goto('https://app.getmailet.com/guest', { timeout: 0 });
        let codeWithText = await getAuthCode(allPages[0], { timeout: 0 });
        await allPages[0].goto(codeWithText, { timeout: 0 });
        let verfemail = await getTwitchEmail(allPages[0]);
        await allPages[0].goto(verfemail, { timeout: 0 });

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
    //await browser.close()
})();

async function getAuthCode(page) {
    //todo click verification lin
    let temp$ = $.load(await page.content())
    let codeWithText = temp$('td').html()
    console.log(codeWithText);
    codeWithText = codeWithText.replace('<a href="', '')
    codeWithText = codeWithText.replace('">Twitch &lt;no-reply@twitch.tv&gt;</a>', '')
    console.log(codeWithText);
    return codeWithText
}
async function getTwitchEmail(page) {
    //todo click verification lin
    let temp$ = $.load(await page.content())
    let codeWithText = temp$('.button > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href');
    console.log("email" + codeWithText);
    return codeWithText
}
async function creatCredentials(mailPage) {
    await delay(1000);
    let temp$ = $.load(await mailPage.content())
    console.log(temp$);
    let email = temp$('.card-subtitle').text()
    let name = random_name({ random: Math.random, female: true }) + random_name({ random: Math.random, female: true }) + random_name({ random: Math.random, female: true })
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