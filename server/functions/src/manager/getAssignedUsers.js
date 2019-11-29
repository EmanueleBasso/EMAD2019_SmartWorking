const utils = require('../utils/utils');
const db = utils.db;


module.exports = (request, response) => {

    var project = request.query.project
    var employees = []
    var i = 0
    var flag = 1

    db.collection('AssociazioneDipendenteProgetto').where('progetto', '==', project).get().then(snapshot => {

        snapshot.forEach(async elem => {

            await db.collection('Dipendente').doc(elem.data().dipendente).get().then(async document => {

                employees.push({nome: document.data().nome, cognome: document.data().cognome, email: document.data().email, calendar: []})

                await db.collection('SmartWorking').where('dipendente', '==', document.id).get().then(collection => {

                    collection.forEach(date => {

                        employees[i].calendar.push({giorno: date.data().giorno, mese: date.data().mese, anno: date.data().anno})

                    })

                    if (flag == snapshot.size) {

                        response.send(employees)

                    }

                    else {

                        flag++
                        i++

                    }

                }).catch(error => {return response.send({hasError: true, error: error.message})})

            }).catch(error => {return response.send({hasError: true, error: error.message})})

        })

    }).catch(error => {return response.send({hasError: true, error: error.message})})
}