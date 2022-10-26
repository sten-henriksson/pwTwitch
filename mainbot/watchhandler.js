/*
async prompts to get how many viewers
start viewbot with envvacriable

*/
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
var spawn = require('child_process').spawn;
const prompt = require("prompt-async");
var os = require('os-utils');
main()

async function main() {
    let session = await getjson();
    session = session.login
    let proxies = await getproxies();
    proxies = proxies.proxies
    let acc = 0
    for (let proxy = 0; proxy < process.env.BOTS; proxy++) {
        let ip = proxies[proxy]
        let bot1 = spawn('node', ['view.js'], { env: { user: session[acc].name, proxy: ip } });
        acc++;
        await delay(1500)
        let bot2 = spawn('node', ['view.js'], { env: { user: session[acc].name, proxy: ip } });
        bot1.stdout.pipe(process.stdout);
        bot2.stdout.pipe(process.stdout);
        acc++
        await delay(1100)
    }
    /*
    while (arraystart <= arrayend) {
        //if array start = 0 proxielenght is 1 and 2
        // array start = 3 start array is 8
        let ip = proxies[arraystart - 1]
        console.log(ip);
        let a = spawn('node', ['view.js'], { env: { user: session[accountToGet - 2].name, proxy: ip } });
        accountToGet++;
        await delay(1500)
        let b = spawn('node', ['view.js'], { env: { user: session[accountToGet - 2].name, proxy: ip } });
        accountToGet++;
        arraystart++;
        a.stdout.pipe(process.stdout);
        b.stdout.pipe(process.stdout);
        await delay(1100)
    }*/
}

async function getjson() {
    const res = await readFileAsync('../config.json')
    user = JSON.parse(res.toString());
    return user
}
async function getproxies() {
    const res = await readFileAsync('../proxies.json')
    user = JSON.parse(res.toString());
    return user
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