var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
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

/*--------------------Routing Over----------------------------*/

app.listen(process.env.PORT || 3000, function () {
    console.log("Express Started on Port 3000");
});