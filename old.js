// Or 'firefox' or 'webkit'.
//bug cant reopen firefox after headfull once only in headless open tab to start code??
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { firefox } = require('playwright');
const prompt = require("prompt-async");
main()
async function main() {
    prompt.start();
    const { arraynr } = await prompt.get(["arraynr"]);
    let arraystart = parseInt(arraynr);
    let arrayend = parseInt(arraynr);
    let session = await getjson();
    let proxies = await getproxies();
    proxies = proxies.proxies;
    let accountToGet = arraystart
    accountToGet++;
    accountToGet = accountToGet * 2;
    session = session.login
    // 2 sessions per proxie
    console.log(arraystart + " " + arrayend + " " + arraynr);
    let ip = proxies[arraystart - 1]
    streamsession(session[arraystart], ip);
    while (arraystart < arrayend) {
        //if array start = 0 proxielenght is 1 and 2
        // array start = 3 start array is 8
        let ip = proxies[arraystart - 1]
        console.log(ip);
        try {
            console.log(session[accountToGet - 1]);
            streamsession(session[accountToGet - 1], ip);
        }
        catch {
            console.log("1faild at " + session[accountToGet - 1] + " " + ip);
        }
        await delay(10000)
        console.log("after delay");
        accountToGet++;
        try {
            console.log(session[accountToGet - 1]);
            streamsession(session[accountToGet - 1], ip);
        }
        catch {
            console.log("1faild at " + session[accountToGet - 1] + " " + ip);
        }
        accountToGet++;
        arraystart++;
    }
}

async function streamsession(session1, proxy) {

    let session = session1.name
    let browser;
    try {
        browser = await firefox.launchPersistentContext("./session/" + session.name, {
            headless: true, proxy: {
                server: proxy
            },
        });
    }
    catch {
        console.log("2faild at " + session + " " + proxy);
        session = false
    }
    if (!session) {
        return false
    }
    const allPages = browser.pages();
    try {
        await allPages[0].goto('https://twitch.tv/akkeoh', { timeout: 0 });
    } catch {
        await allPages[0].screenshot({ path: "./errorImg/error___" + session + ".png" });
        console.log("fail prob proxie");
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
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
async function getjson() {
    const res = await readFileAsync('config.json')
    user = JSON.parse(res.toString());
    return user
}
async function getproxies() {
    const res = await readFileAsync('proxies.json')
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