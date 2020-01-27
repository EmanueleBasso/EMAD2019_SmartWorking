const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var body = JSON.parse(request.body)
    var uid = body.uid
    var extremes = body.dates
    var dates = []

    response.append('Access-Control-Allow-Origin', ['*'])
        
    await db.collection('SmartWorking').where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            var filtered = []

            filtered = snapshot.docs.filter(elem => {

                var date1 = new Date(extremes[0].anno, extremes[0].mese - 1, extremes[0].giorno)
                var date2 = new Date(extremes[1].anno, extremes[1].mese - 1, extremes[1].giorno)
                var date3 = new Date(parseInt(elem.data().anno), parseInt(elem.data().mese) - 1, parseInt(elem.data().giorno))

                return date3.getTime() >= date1.getTime() && date3.getTime() <= date2.getTime()

            })

            if (filtered.length > 0) {

                filtered.forEach(elem => {

                    dates.push({giorno: elem.data().giorno, mese: elem.data().mese, anno: elem.data().anno, isSmartWorkingDay: true})

                })

            }

        }
        
        await db.collection('PostazioniOccupate').where('dipendente', '==', uid).get().then(snapshot1 => {

            if (snapshot1.size != 0) {

                var filtered1 = [] 

                filtered1 = snapshot1.docs.filter(elem1 => {

                    var date1 = new Date(extremes[0].anno, extremes[0].mese - 1, extremes[0].giorno)
                    var date2 = new Date(extremes[1].anno, extremes[1].mese - 1, extremes[1].giorno)
                    var date3 = new Date(parseInt(elem1.data().anno), parseInt(elem1.data().mese) - 1, parseInt(elem1.data().giorno))

                    return date3.getTime() >= date1.getTime() && date3.getTime() <= date2.getTime()

                })

                if (filtered1.length > 0) {

                    filtered1.forEach(elem => {

                        dates.push({giorno: elem.data().giorno, mese: elem.data().mese, anno: elem.data().anno, postazione: elem.data().postazione, stanza: elem.data().stanza, piano: elem.data().piano,  isCompanyDay: true})

                    })

                }

            }

            return response.send(dates)

        }).catch(error => {return response.send({hasError: true, error: error.message})})

    }).catch(error => {return response.send({hasError: true, error: error.message})})
};
