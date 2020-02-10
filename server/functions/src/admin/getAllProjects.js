const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var projects = []
    var flag = 0

    response.append('Access-Control-Allow-Origin', ['*'])

    await db.collection('Progetto').get().then(snapshot => {

        snapshot.forEach(async elem => {

            await db.collection('Dipendente').doc(elem.data().manager).get().then(doc => {

                projects.push({nome: elem.data().nome, descrizione: elem.data().descrizione, id: elem.id, manager: {nome: doc.data().nome, cognome: doc.data().cognome, email: doc.data().email, id:elem.data().manager}})

                if (flag == snapshot.size - 1) {

                    return response.send({hasError: false, progetti: projects})

                }

                flag++

            })

        })

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}