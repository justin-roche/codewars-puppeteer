let htmlToText = require('html-to-text');

async function run(page, language, callback) {

    let languages = await getLanguages(page);
    let i = languages.indexOf(language);

    await page.waitForSelector(`.is-inline > li > .language-selector > #language_dd > .icon-moon-chevron-sign-down`)
    await page.click(`.is-inline > li > .language-selector > #language_dd > .icon-moon-chevron-sign-down`)

    await page.waitForSelector(`li > .language-selector > #language_dd > dl > dd:nth-child(${i + 1})`)
    await page.click(`li > .language-selector > #language_dd > dl > dd:nth-child(${i + 1})`)

    return true;
}

async function getLanguages(page) {

    let t = await page.evaluate((x) => {
        let r = Array.from(document.querySelectorAll('.language-selector dd'));
        let languages = r.map((el) => {
            return el.innerText
        })
        return languages;
    });

    return t;
}
async function getInfo(page) {
    let t = await page.evaluate((x) => {

        let r = Array.from(document.querySelectorAll('.info-row span'));

        let j = {
            stars: r[0].innerHTML,
            satisfaction: r[4].innerHTML,
            completions: r[5].innerHTML,
            issues: r[6].innerHTML,
            author: null,
        }

        let language = Array.from(document.querySelectorAll('.language-selector span'))[0];

        j['language'] = language.getElementsByTagName('span')[0].innerHTML;

        let kyu = Array.from(document.querySelectorAll('.small-hex span'))[0];

        j['kyu'] = kyu.innerHTML;

        return j;
    })


    let obj = await convert(t)
    return obj;
}
async function copyInstructions(page) {
    const innerHTML = await page.evaluate(() => document.querySelector('.description').innerHTML);
    return innerHTML;
}


async function copyTemplate(page) {
    await removeElements(page, ".CodeMirror-linenumber");
    const innerHTML = await page.evaluate(() => document.querySelector('.CodeMirror-code').innerHTML);
    return innerHTML;
}

async function convert(str) {
    if (typeof str === 'object') {
        Object.keys(str).forEach((k) => {
            str[k] = htmlToText.fromString(str[k], {
                wordwrap: 130
            });
        })
        return str;
    } else {
        var text = htmlToText.fromString(str, {
            wordwrap: 130
        });
        return text;
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

module.exports = run
