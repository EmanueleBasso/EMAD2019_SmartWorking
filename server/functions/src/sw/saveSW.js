const utils = require('../utils/utils');
const db = utils.db;

const getSWBlockedDays = require('../manager/getSWBlockedDays');


module.exports = async(request, response) => {
    
    var body = JSON.parse(request.body)
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (body === undefined) {

        return response.send({hasError: true, error: "There was an error"})

    }
    
    var uid = body.uid
    var dates = body.dates
    var batch = db.batch()

    await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            await getSWBlockedDays.getSWBlockedDays(request, response, dates, batch)

        } else {

            return response.send({hasError: true, error: 'Non sei stato ancora assegnato ad alcun progetto'})

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}