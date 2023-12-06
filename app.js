const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

const port = 5400;

app.use(express.static(__dirname + '/app-presentaion/'));
app.use(express.static(__dirname + '/web/'));
app.use(express.static(__dirname + '/theme/'));
app.use(express.static(__dirname + '/contact/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.resolve('app-presentaion/index.html')));
app.get('/app', (req, res) => res.sendFile(path.resolve('web/index.html')));
app.get('/terms-of-service', (req, res) => res.sendFile(path.resolve('theme/index.html')));
app.get('/contact', (req, res) => res.sendFile(path.resolve('contact/index.html')));
app.post ('/contact', (req, res) => {

    


    const transporter = nodemailer.createTransport({
        service: 'SMTP',
        host: 'smtp.ionos.fr', // 'ssl0.ovh.net',
        port: 465,
        secure: true, // Utilisez true si vous utilisez SSL/TLS
        auth: {
            user: 'swapp@deally.fr',
            pass: 'Deally#d2i'
        }
        });
        
        
        // Définir les informations de l'e-mail. 
        const mailOptions = {
        from: 'swapp@deally.fr',
        to: 'swapp@deally.fr',
        subject:  req.body.sujet,
        html: `Nom : ${req.body.nom} \n Numero de telephone :  ${req.body.telephone}  \n Message :  ${req.body.message}`
            
        };
        // Envoyer l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        
        } else {
            console.log('E-mail envoyé avec succès:', info.response);
        
        }
        });

        res.redirect('/contact');
});
app.get('*', (req, res) => res.redirect('/'));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running  on: http://localhost:${port}`));