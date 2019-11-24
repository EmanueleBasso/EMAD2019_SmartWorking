const firebase = require("firebase/app");
require("firebase/firestore");
const utils = require('../utils/utils');

const db = firebase.firestore();


module.exports = async(request, response) => {
    response.append('Access-Control-Allow-Origin', ['*'])

    var batch = db.batch();
    var body = JSON.parse(request.body);
    var uid = body.uid;
    var dates = body.dates;
    var current_month = new Date().getMonth() + 1;

    await db.collection('SmartWorking').where('dipendente', '==', uid).get().then(snapshot => {
        if (snapshot.size == 0) {
            
            utils.addDates(dates, uid, batch)

            utils.sendEmail(uid, request, response, dates)
                    
            batch.commit()

            console.log('DATI INSERITI ED EMAIL INVIATA CON SUCCESSO!') 

        } else {
            db.collection('SmartWorking').where('dipendente', '==', uid).where('mese', '==', current_month).get().then(collection => {

                let prevDatesSorted = []
                let newDatesSorted = []
                let compareArray = []
                
                collection.forEach(elem => {
                    prevDatesSorted.push({
                        giorno: elem.data().giorno,
                        mese: elem.data().mese,
                        anno: elem.data().anno,
                        dipendente: elem.data().dipendente
                    })
                })

                prevDatesSorted = utils.sortDates(prevDatesSorted)
                newDatesSorted = utils.sortDates(dates)

                compareArray.push(prevDatesSorted[prevDatesSorted.length - 1])
                compareArray.push(prevDatesSorted[prevDatesSorted.length - 2])
                compareArray.push(newDatesSorted[0])
                compareArray.push(newDatesSorted[1])

                if (areValidDates(compareArray)) {

                    utils.addDates(dates, uid, batch)

                    utils.sendEmail(uid, request, response, dates)
                    
                    batch.commit()

                    console.log('DATI INSERITI ED EMAIL INVIATA CON SUCCESSO!') 

                } else {

                    response.send({hasError: true, error: 'Hai selezionato più di due giorni di Smart Working nella stessa settimana'})
                }

            }).catch(error => response.send({hasError: true, error: error.message}))
        }
    })
}