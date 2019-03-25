let utils = require('./../utils');

async function run(page, commands) {
    await clear(page)
    await input(page, commands.code)
    await validate(page)
    return await getResults(page);
}

async function clear(page) {

    await page.waitForSelector('#reset_btn')
    await page.click('#reset_btn')

    await page.waitForSelector('#confirm_modal > .modal-footer > .form-actions > .confirm > .btn')
    await page.click('#confirm_modal > .modal-footer > .form-actions > .confirm > .btn')

    await page.waitForSelector('.CodeMirror-activeline:nth-child(1) > .CodeMirror-line:nth-child(4)')
    await page.click('.CodeMirror-activeline:nth-child(1) > .CodeMirror-line:nth-child(4)')

    for (x = 0; x < 100; x++) {
        page.keyboard.press('ArrowDown');
    }
    for (x = 0; x < 1000; x++) {
        page.keyboard.press('Backspace');
    }
}

async function input(page, commands) {
    await page.keyboard.type(commands || 'no input');
}

async function validate(page) {
    await page.waitForSelector('#validate_btn')
    await page.click('#validate_btn')
}

async function getResults(page) {
    let rFrame = null;
    for (const frame of page.mainFrame().childFrames()) {
        if (frame.url().includes('kata_trainer')) {
            rFrame = frame
        }
    }

    await rFrame.waitForSelector('.result-type')
    let x = await rFrame.$$eval('.result-type', (arr) => {
        return arr.map((el) => {
            return el.innerHTML;
        })
    })

    let c = await (utils.htmlToString(x));

    return c.join('\n');

}

module.exports = run
