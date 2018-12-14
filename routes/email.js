const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()


router.get('/', function (req, res) {
  res.status(200).send("you are on http://localhost:3000/sendmail/");
})

/******************ENVOI EMAIL****************************/

router.post('/askForCookiesRecipe', function (req, res) {
  // console.log('You are on http://localhost:3000/sendmail/askForCookiesRecipe');
  // res.status(200).send('You are on http://localhost:3000/sendmail/askForCookiesRecipe');
  
  // Création de la méthode de transport de l'email 
let smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
  }
});

let mailOption = {
  from: "Ton bon samaritain <sudentwcs@gmail.com>", // Expediteur
  to: "delphine.brunet@gmail.com, ", // Destinataires
  subject: "I loved your cookies !", // Sujet
  text: "Hello world ✔", // plaintext body
  html: "<b>Hello world ✔</b>" // html body
};
  
  
  smtpTransport.sendMail( mailOption, (error, response) => {
    if(error){
        return res.send(error);
    } else {
        return res.send(`Message sent: ${response.message}`);
    }
  });
})

module.exports = router;
