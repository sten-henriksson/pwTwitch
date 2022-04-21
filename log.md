## 22-04-14
start by testing out headless headfull with playwright to see if session between headless to headfull works abandon as it all seems same as pupeteer

## 22-04-17
read about firefox headless works diffrent and test it out. Works as i was hoping and session is saved between moving between them. Try going from resedentail ip to mobile ip and session is still saved.

        (async () => {
            const browser = await firefox.launchPersistentContext("./session/assgg68", { headless: false });
            const page = await browser.newPage();
            await page.goto('https://www.twitch.tv');
            await delay(1000)
            await page.screenshot({ path: '5.png' });
            await page.close()
            //await browser.close();
            // other actions...
        })();
cant creat new [pages](https://github.com/microsoft/playwright/issues/3696) and its wont be fixed so account creating with 1 page is needed. 
TODO for next
> go to get url for email and url for verifying account
> test proxies
# 04-18
transported all to firefox and use link to verify account.
inspect selector to get path to element quick.

# 04-19
fixed promt to make capatcha and exit smoother
setup proxies from proxiefish and worked without problems and kept session.
live test with twitch dashboard worked as intended and conted as viewer

# 04-20
    viewingimg that show username as png to confirm their watching and what their watching. Error img show with name and not "ass" as name