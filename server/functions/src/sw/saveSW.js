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
    var flag = 1

    await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            snapshot.forEach(async elem => {

                await db.collection('GiorniBloccati').where('progetto', '==', elem.data().progetto).get()
                    .then(collection => {

                        if (collection.size != 0) {
            
                            collection.forEach(blocked => {

                                var blockedDate
                            
                                var dateOfInterest = new Date(parseInt(blocked.data().anno), parseInt(blocked.data().mese) - 1, parseInt(blocked.data().giorno))

                                if (dateOfInterest.getTime() >= date.getTime()) {

                                    blockedDate = {giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno}
                
                                    if (!utils.containsDate(blockedDate, blockedDates))
                
                                        blockedDates.push({giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno})

                                }
                
                            })

                            flag++
                
                        } else {

                            flag++

                        }
                        
                        if (flag == snapshot.size) {

                            if (blockedDates.length > 0) {
                            
                                dates.forEach(date => {

                                    if (utils.containsDate(date, blockedDates)) {

                                        insertedBlockedDates.push({giorno: date.giorno, mese: date.mese, anno: date.anno})

                                    }

                                })

                                if (insertedBlockedDates.length > 0) {

                                    response.send({areBlockedDays: true, dates: insertedBlockedDates})

                                } else {

                                    utils.saveSW(request, response, uid, dates, batch) 

                                }
                                
                            } else {

                                utils.saveSW(request, response, uid, dates, batch) 

                            }

                        }

                }).catch(error => {return response.send({hasError: true, error: error.message})})

            })

        } else {

            return response.send({hasError: true, error: 'Non sei stato assegnato ancora ad alcun progetto'})

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})


}