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
            user: process.env.SENDER_USER,
            pass: process.env.SENDER_PASS 
        }
    });
  
    let mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `Message from ${name}`,
        html: `
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
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