const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var employees = []

    response.append('Access-Control-Allow-Origin', ['*'])

    await db.collection('Dipendente').get().then(snapshot => {

        snapshot.forEach(elem => {

            employees.push({nome: elem.data().nome, cognome: elem.data().cognome, email: elem.data().email, manager: elem.data().manager})

        })

        return response.send({hasError: false, dipendenti: employees})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}