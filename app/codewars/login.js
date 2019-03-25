let utils = require('./../utils');
let loginUrl = 'https://www.codewars.com/users/sign_in';

async function run(page, commands, callback) {
    console.log('calling LOGIN', commands);

    let url = page.url();
    if (url != loginUrl) {
        await page.goto(loginUrl)
        await page.waitForSelector('#user_email', { timeout: 100000 })
    }

    await page.click('#user_email')
    await page.type("#user_email", commands.user)
    await page.click('#user_password')
    await page.type("#user_password", commands.password)

    await page.evaluate(() => {
        let btn = [...document.querySelectorAll('button')]
            .find(element => element.textContent === 'Log In').click();
    })
    return true;

}

module.exports = run
