const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {
    
    var body = JSON.parse(request.body)
    var blockedDates = []
    var insertedBlockedDates = []
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (body === undefined) {

        return response.send({hasError: true, error: "There was an error"})

    }
    
    var uid = body.uid
    var dates = body.dates
    var batch = db.batch()
    var date = new Date()
    var monthOfInterest = date.getMonth() + 1
    var flag = 1

    await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            snapshot.forEach(async elem => {

                await db.collection('GiorniBloccati').where('progetto', '==', elem.data().progetto).get()
                    .then(collection => {

                        if (collection.size != 0) {
            
                            collection.forEach(blocked => {
                            
                                var blockedDate

                                if (blocked.data().giorno >= date.getDay() && blocked.data().mese >= monthOfInterest && blocked.data().anno >= date.getFullYear()) {

                                    blockedDate = {giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno}
                
                                    if (!utils.containsDate(blockedDate, blockedDates))
                
                                        blockedDates.push({giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno})

                                }
                
                            })
                
                            if (flag == snapshot.size) {

                                if (blockedDates.length > 0) {
                                
                                    dates.forEach(date => {

                                        if (utils.containsDate(date, blockedDates)) {

                                            insertedBlockedDates.push({giorno: date.giorno, mese: date.mese, anno: date.anno})

                                        }

                                    })

                                    if (insertedBlockedDates.length > 0) {

                                        console.log(JSON.stringify(insertedBlockedDates))

                                        response.send({areBlockedDays: true, dates: insertedBlockedDates})

                                    } else {

                                        utils.saveSW(request, response, uid, dates, batch) 

                                    }
                                    
                                } else {

                                    utils.saveSW(request, response, uid, dates, batch) 

                                }

                            } else {

                                flag++

                            }
                
                        } else {

                            flag++

                        }

                }).catch(error => console.log(error.message))

            })

        } else {

            return response.send({hasError: true, error: 'Non sei stato assegnato ancora ad alcun progetto'})

        }

    }).catch(error => console.log(error.message))


}