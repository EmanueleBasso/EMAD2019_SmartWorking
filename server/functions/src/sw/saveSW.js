const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {
    
    var body = JSON.parse(request.body)
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (body === undefined) {

        response.send({hasError: true, error: "There was an error"})

    }
    
    var uid = body.uid
    var dates = body.dates
    var batch = db.batch()

    await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            await db.collection('SmartWorking').where('dipendente', '==', uid).get().then(snapshot => {
                        
                if (snapshot.size == 0) {
                    
                    utils.addDates(dates, uid, batch)
        
                    utils.sendSmartWorkingCalendar(uid, request, response, dates)
                            
                    batch.commit()
        
                    console.log('DATI INSERITI ED EMAIL INVIATA CON SUCCESSO!') 
        
                } else {
    
                    let prevCollection = []
                    let current_month = new Date().getMonth() + 1
        
                    prevCollection = snapshot.docs.filter(elem => elem.data().mese == current_month)
    
                    if (prevCollection.length == 0 || prevCollection.length == 1 && dates.length == 1) {
        
                        utils.addDates(dates, uid, batch)
        
                        utils.sendSmartWorkingCalendar(uid, request, response, dates)
                        
                        batch.commit()
        
                        console.log('MESE PRECEDENTE VUOTO OPPURE DATE COMPATIBILI. DATI INSERITI ED EMAIL INVIATA CON SUCCESSO!')
    
                    } else {
        
                        let prevDatesSorted = []
                        let newDatesSorted = []
                        let compareArray = []
                        
                        prevCollection.forEach(elem => {
                            prevDatesSorted.push({
                                giorno: elem.data().giorno,
                                mese: elem.data().mese,
                                anno: elem.data().anno,
                                dipendente: elem.data().dipendente
                            })
                        })
            
                        prevDatesSorted = utils.sortDates(prevDatesSorted)
                        newDatesSorted = utils.sortDates(dates)
            
                        if (prevDatesSorted.length > 1) {
    
                            compareArray.push(prevDatesSorted[prevDatesSorted.length - 1])
                            compareArray.push(prevDatesSorted[prevDatesSorted.length - 2])
    
                        } else {
    
                            compareArray.push(prevDatesSorted[0])
    
                        }
            
                        if (newDatesSorted.length > 1) {
    
                            compareArray.push(newDatesSorted[newDatesSorted.length - 1])
                            compareArray.push(newDatesSorted[newDatesSorted.length - 2])
    
                        } else {
    
                            compareArray.push(newDatesSorted[0])
                            
                        }
            
                        if (utils.areValidDates(compareArray)) {
            
                            utils.addDates(dates, uid, batch)
            
                            utils.sendSmartWorkingCalendar(uid, request, response, dates)
                            
                            batch.commit()
            
                            console.log('DATE VALIDE ED EMAIL INVIATA CON SUCCESSO!') 
            
                        } else {
            
                           response.send({hasError: true, error: 'Hai selezionato più di due giorni di Smart Working nella stessa settimana a cavallo tra il mese corrente e il prossimo'})
                        }
    
                    }
    
                }
                
            }).catch(error => {return response.send({hasError: true, error: error.message})})

        } else {

            return response.send({hasError: true, error: 'Non sei stato ancora assegnato ad alcun progetto'})

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}