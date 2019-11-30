const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {
    var uid = request.query.uid

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        return response.send({hasError: true, error: "UID undefined"})

    }

    await db.collection('Dipendente').doc(uid)
    .get().then( (snapshot) => {

        if (snapshot.data().manager == true) {

            return response.send({hasError: false, isManager: true})

        } else {

            return response.send({hasError: false, isManager: false})
            
        }
    }).catch(() => {return response.send({hasError: true})})
};
