const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var body = JSON.parse(request.body)
    var dates = body.dates
    var floor = body.floor
    var room = body.room
    var position = body.position
    var uid = body.uid
    var flag = 1

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid == undefined || floor == undefined || room == undefined || position == undefined || dates == undefined) {

        return response.send({hasError: true, error: 'THERE WAS AN ERROR'})

    }

    dates.forEach(async element => {
        
        await db.collection('PostazioniOccupate').add({

            dipendente: uid,
            piano: floor,
            stanza: room,
            postazione: position,
            giorno: element.giorno,
            mese: element.mese,
            anno: element.anno

        }).then(() => {

            if (flag == dates.length) {

                return response.send({hasError: false})

            } else {

                flag++

            }

        }).catch(error => {return response.send({hasError: true, error: error.message})})

    });   

}