/**
 * Created by ilyushen on 08.05.2017.
 */
var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    express = require('express'),
    fs = require('fs'),
    parseString = require('xml2js').parseString,
    request = require('request'),
    app = express(),
    server;

app.get('/hello', function (req, res) {

    request('http://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=22/01/1998', function (error, response, body) {
        console.log(body);
        parseString(body, function (err, result) {
            console.log(JSON.stringify(result));
        });
    });

});

server = app.listen(9090, function () {
    console.log('Listen on port 9090');
});