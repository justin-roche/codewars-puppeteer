let json = require("body-parser").json;
let puppet = require('./puppet')

var nodeCleanup = require('node-cleanup');
let rq = require('request')
const app = require('express')();
const bodyParser = require('body-parser');
let http = require('http').Server(app);
let codewarsRouter = require('./codewars/codewars.route.js');

app.use(bodyParser());
app.use(json());
app.disable("x-powered-by");

app.use('/codewars', codewarsRouter);

console.log('process mode', process.env.NODE_ENV)

process.once('SIGUSR2', function() {
    puppet.destroy()
    process.kill(process.pid, 'SIGUSR2');
});

nodeCleanup(function(exitCode, signal) {
    console.log('destroying puppet', typeof puppet);
    puppet.destroy()
});

var port = 3005

http.listen(port, function() {
    console.log('listening on this port: http://localhost:' + port);
});



