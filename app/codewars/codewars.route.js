let router = require('express').Router();
let puppet = require('./../puppet');

let login = require('./login');
let navigate = require('./navigate');
let test = require('./test');
let load = require('./load');
let next = require('./next');
let changeLanguage = require('./changeLanguage');

router.post("/status", async (request, response) => {
    console.log('got status request');
    response.status(200);
    console.log('sent status request');
    response.json({ ready: true });
});

router.post("/login", async (request, response) => {
    let p = puppet.getPage();
    await navigate(p);
    let r = await login(p, request.body);
})

router.post("/load", async (request, response) => {
    console.log('calling LOAD');

    let p = puppet.getPage();
    await navigate(p);
    let r = await load(p, request.body);
    console.log('returning LOAD', r);

    response.status(200);

    response.json(r);
})

router.post("/next", async (request, response) => {

    console.log('calling NEXT');
    let p = puppet.getPage();
    await navigate(p);
    await next(p);
    let r = await load(p, request.body);
    console.log(p.info)
    response.json(r);
})

router.post("/test", async (request, response) => {
    let p = puppet.getPage();
    await navigate(p);
    let r = await test(p, request.body);
    response.json({ results: r });
})

router.post("/change-language", async (request, response) => {
    let p = puppet.getPage();
    console.log('body', request.body.language);
    await changeLanguage(p, request.body.language);
    // await p.awaitNavigation();
    let r = await load(p, request.body);
    response.json(r);

})

router.get("/", (request, response) => {

})

module.exports = router; 
