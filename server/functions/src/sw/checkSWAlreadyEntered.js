const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var uid = request.query.uid

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined){
        return response.send({hasError: true, error: "UID undefined"})
    }

    var next_month = (new Date()).getMonth() + 2
    var year = (new Date()).getFullYear()
    
    if (next_month === 13) {
        next_month = 1
        year = year + 1
    }

    await db.collection('SmartWorking')
    .where('dipendente', '==', uid)
    .where('anno', '==', year + '')
    .where('mese', '==', next_month + '')
    .get().then( (snapshot) => {

        if (snapshot.size != 0) {
            response.send({alreadyEntered: true})
        } else {
            response.send({alreadyEntered: false})
        }

    }).catch(() => response.send({alreadyEntered: false}))

};
