const utils = require('../utils/utils');
const db = utils.db;


module.exports = (request, response) => {

    var project = request.query.project
    var employees = []
    var i = 0
    var flag = 1

    db.collection('Dipendente').where('progetto', '==', project).get().then(snapshot => {

        snapshot.forEach(async elem => {

            employees.push({nome: elem.data().nome, cognome: elem.data().cognome, email: elem.data().email, calendar: []})

            await db.collection('SmartWorking').where('dipendente', '==', elem.id).get().then(collection => {

                collection.forEach(date => {

                    employees[i].calendar.push({giorno: date.data().giorno, mese: date.data().mese, anno: date.data().anno})

                })

                if (flag == snapshot.size) {

                    response.send(employees)

                }

                flag++
                i++

            }).catch(error => {return response.send({hasError: true, error: error.message})})

        })

    }).catch(error => {return response.send({hasError: true, error: error.message})})
}