const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {
    
    var body = JSON.parse(request.body)
    var uid = body.uid
    var dates = body.dates
    var batch = db.batch()
    var flag = 1
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (body === undefined) {

        response.send({hasError: true, error: "There was an error"})

    }

    await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            let blockedDates = []

            snapshot.forEach(async elem => {

                await db.collection('GiorniBloccati').where('progetto', '==', elem.data().progetto).get()
                .then(collection => {

                    if (collection.size != 0) {
            
                        collection.forEach(blocked => {

                            if (!utils.containsDate(blocked, blockedDates))
            
                                blockedDates.push({giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno})
            
                        })

                        if (flag == snapshot.size) {

                            let checked = utils.getBlockedDates(blockedDates, dates)

                            console.log('CIAO, LE DATE BLOCCATE SONO: ' + checked.length)

                            if (checked.length != 0) {

                                let s;

                                if (checked.length > 1)
                                    s = "I giorni  "

                                else
                                    s = "Il giorno  "

                                checked.forEach(elem => {

                                    s = s + elem.giorno + "/" + elem.mese + "/" + elem.anno + "  "

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

                            flag++

                        }
            
                    } else {
            
                        flag++
            
                    }

                }).catch(error => {return response.send({hasError: true, error: error.message})})

            })

        } else {

            return response.send({hasError: true, error: 'Non sei stato ancora assegnato ad alcun progetto'})

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}