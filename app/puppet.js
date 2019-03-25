let puppeteer = require('puppeteer');

let puppeteerOptions = {
    executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    headless: false,
    args: [
        '--disable-session-crashed-bubble',
        '--disable-infobars',
        '--incognito',
        '--remote-debugging-port=9222',
        '--user-data-dir: /Users/justin/Library/Application Support/Chromium/Default',
        // '--auto-open-devtools-for-tabs'
    ],
    defaultViewport: {
        isMobile: true,
        width: 500,
        height: 500
    },
    timeout: 4000000,
    slowMo: 1
}

class Puppet {

    constructor() {
        this._puppet = null;
        this.initialize();
    }

    async initialize() {
        this._puppet = await puppeteer.launch(puppeteerOptions)
        this._page = await this._puppet.newPage();
    }

    getPage() {
        return this._page
    }

    async destroy() {
        this._puppet.close();
    }
}

let puppetInstance = new Puppet
module.exports = puppetInstance;
