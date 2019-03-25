let utils = require('./../utils');

async function run(page, commands, callback) {

    await page.waitForSelector('#skip_btn');
    await utils.removeElements(page, '.game-title');
    await page.click('#skip_btn');
    await page.waitForSelector('.game-title', { timeout: 100000 });
    console.log('navigated to next kata');
    return true;

}

module.exports = run
