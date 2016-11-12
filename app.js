'use strict'
Array.prototype.remove = function (element) {
    var index = this.indexOf(element);
    if(index > -1){
        this.splice(index, 1);
    }
};
Array.prototype.includes = function (element) {
    var index = this.indexOf(element);
    return index > -1;
};
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const answer = require('./answerFactory');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let data = {
    response_type: 'in_channel',
    text: '302: Found',
};

const db = {
    orders: [],
    defaults: []
};
app.use('/clearItPlease', (req, res) => {
    console.log('Cleat it');
    db.orders = [];
});
app.use('/addDefault', (req, res) => {
    let user = req.query.user;
    console.log(user);
    req.query.user && db.defaults.push(user) && console.log('Added user as default '  + user);
    res.end('');
});
app.use('/showMeDefaults', (req, res) => {
    let user = req.query.user;
    console.log(user);
    req.query.user && db.defaults.push(user) && console.log('Added user as default '  + user);
    res.end('');
});
app.use('/', (req, res) => {
    res.json(answer(req, db));
});

server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', () => {


}
);
