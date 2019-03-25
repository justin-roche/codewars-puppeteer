let htmlToText = require('html-to-text');

async function getElementByProperty(page, selector, property, value) {

    return await page.evaluate((selector, property, value) => {
        return [...document.querySelectorAll('button')]
        // .find(element => element[property] === value);
    }, selector, property, value);

}
async function htmlToString(input) {
    if (Array.isArray(input)) {

        return await Promise.all(input.map(async (language) => {
            return await htmlToString(language)
        }))
    }
    else if (typeof input === 'object') {
        Object.keys(input).forEach((k) => {
            input[k] = htmlToText.fromString(input[k], {
                wordwrap: false
            });
        })
        return input;
    } else {

        var text = htmlToText.fromString(input, {
            wordwrap: false
        });
        return text;
    }
}


async function getInner(page, selector, map = false, wait = true) {
    let result = null;
    console.log(selector);

    if (wait) {
        page.waitForSelector(selector)
    }

    if (map) {
        let x = await page.$$eval(selector, (els) => {
            return els.map((el) => {
                return el.innerHTML
            })
        })
        return x
    }
    else {
        let els = await page.$$(selector);
        return await page.evaluate(el => el.innerHTML, els[0]);
    }


}

async function removeElements(page, selector) {
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, selector)

}


module.exports = {
    htmlToString,
    getInner,
    getElementByProperty,
    removeElements

};
