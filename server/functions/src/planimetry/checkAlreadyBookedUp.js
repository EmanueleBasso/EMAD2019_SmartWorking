const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var uid = request.query.uid
    var floor = request.query.floor
    var room = request.query.room
    var position = request.query.position
    var daysOfSw = []
    var blockedDays = []
    var userDays = []
    var today = new Date()

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid == undefined || floor == undefined || room == undefined || position == undefined) {

        return response.send({hasError: true, error: 'THERE WAS AN ERROR'})

    }

    await db.collection('SmartWorking').where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            var days = snapshot.docs.filter(elem => {

                var date = new Date(parseInt(elem.data().anno), parseInt(elem.data().mese) - 1, parseInt(elem.data().giorno))

                return date.getTime() >= today.getTime()

            })

            days.forEach(elem => {

                daysOfSw.push({giorno: elem.data().giorno, mese: elem.data().mese, anno: elem.data().anno})

            })

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})

    await db.collection('PostazioniOccupate').where('piano', '==', floor)
    .where('stanza', '==', room)
    .where('postazione', '==', position).get().then(async blockedDaysOfPosition => {

        if (blockedDaysOfPosition.size != 0) {

            var positions = blockedDaysOfPosition.docs.filter(position => {

                var date1 = new Date(parseInt(position.data().anno), parseInt(position.data().mese) - 1, parseInt(position.data().giorno))
    
                return date1.getTime() >= today.getTime()
    
            })

            positions.forEach(elem => {

                blockedDays.push({giorno: elem.data().giorno, mese: elem.data().mese, anno: elem.data().anno})

            })

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})}) 

    await db.collection('PostazioniOccupate').where('dipendente', '==', uid).get().then(userBlockedDays => {

        if (userBlockedDays.size != 0) {

            var userPositions = userBlockedDays.docs.filter(userPosition => {

                var date2 = new Date(parseInt(userPosition.data().anno), parseInt(userPosition.data().mese) - 1, parseInt(userPosition.data().giorno))
    
                return date2.getTime() >= today.getTime()
    
            })

            userPositions.forEach(elem => {

                userDays.push({giorno: elem.data().giorno, mese: elem.data().mese, anno: elem.data().anno})

            })

        }

        return response.send({giorniSW: daysOfSw, giorniOccupati: blockedDays, giorniPrenotati: userDays})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}