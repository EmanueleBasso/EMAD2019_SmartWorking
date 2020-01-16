const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var uid = request.query.uid
    var date = new Date()
    var currentMonth = date.getMonth() + 1

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        return response.send({hasError: true, error: "There was an error"})
        
    }
    
    await db.collection('DipendentiBloccati').add({

        dipendente: uid,
        mese: currentMonth,
        anno: date.getFullYear()

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}