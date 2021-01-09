// var express = require('express');
// var router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config()
module.exports = (app) => {

app.post('/send', async (req, res, next) => {
    console.log(req.body)
    var name = req.body.name
    var email = req.body.email
    var message = req.body.msg
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
    let testAccount = await nodemailer.createTestAccount();
  
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: '465',
        auth: {
            user: process.env['sender-user'],
            pass: process.env['sender-pass'] 
        }
    });
  
    let mailOptions = {
        from: email,
        to: process.env['receiver-email'],
        subject: `Message from ${name}`,
        html: `
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Message: ${message}</li>
        </ul>
        `
    }
  
    smtpTransport.sendMail(mailOptions, (err, res)=>{
        if (err){
            console.log(err)
            res.send(err)
              .catch((err)=>{
                console.log(err)
              })
        } else {
            res.send('Success')
        }
    })
    smtpTransport.close();
    res.render("layouts/home", {status: "success"});
  })
}