/**
 * Created by ilyushen on 08.05.2017.
 */
var express = require('express'),
    fs = require('fs'),
    parseString = require('xml2js').parseString,
    request = require('request'),
    app = express(),
    server;

app.use('/', express.static('./dist/'));

app.get('/responseRouter', function (req, res) {
    var query = req.query;
    request(query.url, function (error, response, body) {
        parseString(body, function (err, result) {
            res.end(JSON.stringify(result));
        });
    });

});

server = app.listen(9090, function (req, res) {
    console.log('Listen on port 9090');
});