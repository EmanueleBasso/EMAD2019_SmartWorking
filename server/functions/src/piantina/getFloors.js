const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    response.append('Access-Control-Allow-Origin', ['*'])

    var floors = []

    db.collection('Piani').get().then(snapshot => {

        snapshot.forEach(elem => {

            floors.push({nome: elem.data().piano})

        })

        response.send(floors)

    }).catch(error => {return response.send({hasError: true, error: error.message})})
}