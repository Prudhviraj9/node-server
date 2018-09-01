// var express = require("express");
// var app = express();
// var port = 3000;

// var mongoose = require("mongoose");
// var bodyParser = require('body-parser');



// var nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastNameName: String
// });

// var User = mongoose.model("User", nameSchema);

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/node-server");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.listen(port, () => {
//     console.log("Server listening on port " + port);
// });

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData.save()
//         .then(item => {
//             res.send("item saved to database");
//         })
//         .catch(err => {
//             res.status(400).send("unable to save to database");
//         });
// });

var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
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

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});