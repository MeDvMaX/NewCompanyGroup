/**
 * Created by ilyushen on 08.05.2017.
 */
var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    express = require('express'),
    app = express(),
    server;

app.get('/hello', function (req, res) {

    // var options = {
    //     host: 'www.cbr.ru',
    //     // port: 80,
    //     path: '/scripts/XML_daily_eng.asp?date_req=22/01/1998',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // };
    //
    // var httpreq = http.request(options, function (response) {
    //     console.log(response);
    //     res.send(response);
    //     response.setEncoding('utf8');
    //     // response.on('data', function (chunk) {
    //     //     console.log("body: " + chunk);
    //     // });
    //     response.on('end', function() {
    //         res.send(response);
    //     })
    // });
    // httpreq.write('sddss');
    // httpreq.end();
    var data = querystring.stringify({
        username: "myname",
        password: " pass"
    });

    var options = {
        host: 'requestb.in',
        port: 80,
        path: '/nfue7rnf',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        response.on('end', function() {
            res.send('ok');
        })
    });
    httpreq.write(data);
    httpreq.end();


});

server = app.listen(9090, function () {
    console.log('Listen on port 9090');
});