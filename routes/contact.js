// var express = require('express');
// var router = express.Router();
const nodemailer = require("nodemailer");
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
            user: 'haywood.beck13@gmail.com', //replace with the email address
            pass: 'bghbgh123' //replace with the password
        }
    });
  
    let mailOptions = {
        from: email,
        to: 'haywoodbeck12@gmail.com',
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