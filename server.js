const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const app = express();
const server = http.createServer(app);
app.set('port', process.env.PORT || 3000);
app.use('/', express.static(path.resolve(__dirname)));
console.log(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.disable('view cache');
app.use('/', routes);
app.use(function(error, req, res, next) {
    if (error.status === 500) {
        return res.status(500).json({ status: 'Internal Server Error', data: error });
    };
    return next(error);
});

server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function() {
    var addr = server.address();
    console.log("Daquant server listening at", addr.address + ":" + addr.port);
});