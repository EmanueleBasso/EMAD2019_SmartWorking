const utils = require('./utils/utils');
const db = utils.db;


module.exports = async(request, response) => {
    
    var body = JSON.parse(request.body)
    var uid = body.uid
    var dates = body.dates
    var batch = db.batch()
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined){
        response.send({hasError: true, error: "UID undefined"})
    }

    await db.collection('Dipendente').doc(uid).get().then(document => {

        db.collection("GiorniBloccati").where('progetto', '==', document.data().progetto).get().then(snapshot => {

            if (snapshot.size != 0) {

                let blockedDates = []

                snapshot.forEach(elem => {

                    blockedDates.push({giorno: elem.data().giorno, mese: elem.data().mese, anno: elem.data().anno})

                })

                let checked = utils.checkBlockedDates(blockedDates, dates)

                if (checked.length != 0) {
                    let s;

                    if (checked.length > 1)
                        s = "I giorni "

                    else
                        s = "Il giorno "

                    checked.forEach(elem => {

                        s = s + elem.giorno + "/" + elem.mese + "/" + elem.anno + ", "

                    })

                    if (checked.length > 1)
                        s = s + "sono stati bloccati"
                    
                    else
                        s = s + "è stato bloccato"

                    console.log(s)

                    return response.send({hasError: true, error: s});

                } else {

                    utils.saveSWData(request, response, dates, uid, batch)

                }

            } else {

                utils.saveSWData(request, response, dates, uid, batch)

            }

        }).catch(error => {return response.send({hasError: true, error: error.message})})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}