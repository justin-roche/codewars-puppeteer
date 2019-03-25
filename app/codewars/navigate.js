
let codewarsUrl = "https://www.codewars.com/kata/53907ac3cd51b69f790006c5/train/clojure"

async function run(page) {
    await page.setViewport({ width: 1200, height: 500 })
    console.log('navigating');

    let url = page.url();
    if (url != codewarsUrl) {
        await page.goto(codewarsUrl)
        await page.waitForSelector('.game-title', { timeout: 100000 })
    }
}

module.exports = run
