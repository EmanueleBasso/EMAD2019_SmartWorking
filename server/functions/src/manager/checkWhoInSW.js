const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var project = request.query.project
    var day = request.query.day
    var month = request.query.month
    var year = request.query.year
    var employees = []
    var employeesInSw = []
    var flag = 1

    response.append('Access-Control-Allow-Origin', ['*'])

    if (project === undefined || day === undefined || month === undefined || year === undefined) {

        response.send({hasError: true, error: "There was an error"})
        
    }
    
    await db.collection('SmartWorking').where('giorno', '==', day).where('mese', '==', month).where('anno', '==', year)
    .get().then((snapshot) => {

        if (snapshot.size != 0) {

            snapshot.forEach(async elem => {

                await db.collection('AssociazioneDipendenteProgetto').where('dipendente', '==', elem.data().dipendente)
                .where('progetto', '==', project).get().then(collection => {

                    if (collection.size != 0) {

                        employees.push(collection.docs[0].data().dipendente)

                    }

                    if (flag == snapshot.size) {

                        if (employees.length == 0) {

                            return response.send({hasError: true, error: 'Non ci sono dipendenti, associati a questo progetto, che svolgono Smart Working in questo giorno'})

                        } else {

                            let flag_1 = 1

                            employees.forEach(async employe => {

                                await db.collection('Dipendente').doc(employe).get().then(document => {

                                    employeesInSw.push({nome: document.data().nome, cognome: document.data().cognome, email: document.data().email})
                                    console.log('CIAO ANTONIO, I DIPENDENTI SONO: ' + JSON.stringify(employeesInSw))

                                    if (flag_1 == employees.length)

                                        return response.send(employeesInSw)

                                    else 

                                        flag_1++

                                }).catch(error => {return response.send({hasError: true, error: error.message})})

                            })

                        }

                    }

                    else

                        flag++

                }).catch(error => {return response.send({hasError: true, error: error.message})})

            })

        } else {

            return response.send({hasError: true, error: 'Non ci sono dipendenti, associati a questo progetto, che svolgono Smart Working in questo giorno'})

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}