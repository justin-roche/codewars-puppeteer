let utils = require('./../utils');

async function run(page, commands, callback) {

    let info = await utils.htmlToString(await getInfo(page));
    let instructions = await utils.htmlToString(await getInstructions(page, info));
    let template = await utils.htmlToString(await getTemplate(page));
    let languages = await utils.htmlToString(await getLanguages(page))

    template = template.replace(/[^\x00-\xFF]/g, "");

    return { info, instructions, languages, template };
}

async function getInfo(page) {

    let title = await utils.getInner(page, '.game-title h4');
    let kyu = await utils.getInner(page, '.small-hex span');
    let language = await utils.getInner(page, '.language-selector span span');
    let infoResults = await utils.getInner(page, '.info-row span', true)

    return {
        title: title,
        kyu: kyu.split(' ')[0],
        language: language.toLowerCase(),
        stars: infoResults[0],
        satisfaction: infoResults[4],
        completions: infoResults[5],
        issues: infoResults[6] ? infoResults[6].split(" ")[0] : "none",
    };
}


async function getInstructions(page, info) {

    await page.waitForSelector('.description');
    await page.$$eval('.description code', (codeBlocks, info) => {

        codeBlocks.forEach((block) => {
            if (block.innerHTML.split(" ").length > 2) {
                let t = block.innerHTML;
                block.innerHTML = `#+BEGIN_SRC ${info.language} \r\n` + t + "\r\n #+END_SRC";
            }
        });

    }, info);

    return await utils.getInner(page, '.description')
}

async function getLanguages(page) {
    return await utils.getInner(page, '.language-selector dd', true)
}

async function getTemplate(page) {
    if (page.$(".CodeMirror-linenumber")) {
        await utils.removeElements(page, ".CodeMirror-linenumber");
    }
    return await utils.getInner(page, '.CodeMirror-code');

}
module.exports = run;
