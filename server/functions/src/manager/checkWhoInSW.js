const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {
    var project = request.query.project
    var day = request.query.day
    var month = request.query.month
    var year = request.query.year

    var employees = []

    response.append('Access-Control-Allow-Origin', ['*'])
    
    await db.collection('SmartWorking').where('giorno', '==', day).where('mese', '==', month).where('anno', '==', year)
    .get().then(async (snapshot) => {
        await db.collection('Progetto').doc(project)
        .get().then(async (snapshot2) => {
            if(snapshot.size != 0) {
                var dipendentiSW = []
                snapshot.forEach(element => {
                    dipendentiSW.push(element.data().dipendente)
                })

                var dipendentiProgetto = snapshot2.data().dipendenti

                if(dipendentiProgetto.length != 0) {
                    for(dip of dipendentiProgetto) {
                        for (dip2 of  dipendentiSW) {
                            if (dip === dip2) {
                                await db.collection('Dipendente').doc(dip).get().then(async (document) => {
                                    employees.push({nome: document.data().nome, cognome: document.data().cognome, email: document.data().email})
                                }).catch(error => {return response.send({hasError: true, error: error.message})});
                            }
                        }
                    }
                }
            }

            response.send(employees)
        }).catch(error => {return response.send({hasError: true, error: error.message})});
    }).catch(error => {return response.send({hasError: true, error: error.message})})
}