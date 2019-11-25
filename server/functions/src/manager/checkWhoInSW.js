const utils = require('./utils/utils');
const db = utils.db;


module.exports = (request, response) => {

    var project = request.query.project
    var day = today.getDate()
    var month = today.getMonth() + 1
    var year = today.getFullYear()
    var employees = []
    var flag = 1

    response.append('Access-Control-Allow-Origin', ['*'])
    
    db.collection('SmartWorking').where('giorno', '==', day.toString()).where('mese', '==', month.toString()).where('anno', '==', year.toString())
    .get().then(snapshot => {

        snapshot.forEach(async element => {
            await db.collection('Dipendente').doc(element.data().dipendente).get().then(document => {

                employees.push({nome: document.data().nome, cognome: document.data().cognome, email: document.data().email, progetto: document.data().progetto})

                if (flag == snapshot.size) {

                    let filteredEmployees = employees.filter(elem => elem.progetto == project)

                    response.send(filteredEmployees)

                }

                flag++

            }).catch(error => {return response.send({hasError: true, error: error.message})})
        });

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}