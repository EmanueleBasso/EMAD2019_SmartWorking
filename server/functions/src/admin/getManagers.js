const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var managers = []

    response.append('Access-Control-Allow-Origin', ['*'])

    await db.collection('Dipendente').where("manager", "==", true).get().then(async snapshot => {

        snapshot.forEach(elem => {

            managers.push({nome: elem.data().nome, cognome: elem.data().cognome, email: elem.data().email, id: elem.id})

        })

        return response.send({hasError: false, managers: managers})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}