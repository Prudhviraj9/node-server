var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
const bodyParser= require('body-parser')
var db;
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://rajnookala:qwert1234@ds121960.mlab.com:21960/bhartiautomobile', (err, client) => {
    if (err) return console.log(err)
    db = client.db('bhartiautomobile') // whatever your database name is
    app.listen(process.env.PORT || 3000, () => {
        console.log('listening on 3000')
    })
})
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "raj.nookala@gmail.com",
        pass: "Theju!$#2"
    }
});
/*------------------SMTP Over-----------------------------*/

// Add headers

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

/*------------------Routing Started ------------------------*/

app.get('/', function (req, res) {
    res.sendfile('index.html');
});
app.get('/send', function (req, res) {
    var mailOptions = {
        to: req.query.to,
        subject: req.query.subject,
        html: req.query.text
    }
    console.log(mailOptions);
    var cursor = db.collection('quotes').find();
    console.log(cursor);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.post('/user', (req, res) => {
    console.log(req.body);

    db.collection('user').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
      })
})

/*--------------------Routing Over----------------------------*/