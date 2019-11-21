const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const firebase = require("firebase/app");
require("firebase/firestore")

admin.initializeApp();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'smartworking.unisa@gmail.com',
        pass: 'SWunisa2019'
    }
});

module.exports = async(request, response) => {
    var uid = request.query.uid;
    var dates = request.query.pianoSW;
    var db = firebase.firestore();

    response.append('Access-Control-Allow-Origin', ['*'])
    //dates.forEach(elem => {
        db.collection('SmartWorking').add({
            data: dates,
            dipendente: uid
        })
    //})
    .then(() => {

            db.collection('Dipendente').doc(uid).get().then(document => {

                cors(request, response, () => {
            
                    const mailOptions = {
                        from: 'Amministratore Smart Working<smartworking.unisa@gmail.com>',
                        to: 'antonio.basileo92@gmail.com',
                        subject: 'Piano di Smart Working',
                        html: "<p style=\"font-size: 16px;\">Ciao " + document.data().nome + " " + document.data().cognome + ",</p>" 
                        + "<p style=\"font-size: 16px;\">ecco il tuo piano di Smart Working per il prossimo mese:</p>" 
                        + "<br /> " 
                        + "<p style=\"font-size: 20px; font-weight: bold;\">" + dates + "</p>" 
                        + "<br /> " 
                        + "<img style=\"width: 300px; height: 300px;\" src=\"https://firebasestorage.googleapis.com/v0/b/smart-working-5f3ea.appspot.com/o/logoApp.png?alt=media&token=6eb5bc0c-8b16-4db1-9714-eb3f0491f819\" />"
                    };
              
                    return transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            return response.send({hasError: true, error: error.message});
                        }
                        return response.send({hasError: false});
                    });
                });  
            })
    }).catch(error => {
        response.send({hasError: true, error: error.message})
    })
}