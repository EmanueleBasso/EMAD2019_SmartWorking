const utils = require('../utils/utils');
const db = utils.db;


module.exports = (request, response) => {

    var project = request.query.project
    var today = new Date()
    var currentMonth = today.getMonth() + 1
    var employees = []
    var i = 0
    var flag = 1

    response.append('Access-Control-Allow-Origin', ['*'])

    db.collection('AssociazioneDipendenteProgetto').where('progetto', '==', project).get().then(snapshot => {

        snapshot.forEach(async elem => {

            await db.collection('Dipendente').doc(elem.data().dipendente).get().then(async document => {

                employees.push({nome: document.data().nome, cognome: document.data().cognome, uid: document.id, meseSuccessivoBloccato: false, calendario: []})

                await db.collection('DipendentiBloccati')
                .where('dipendente', '==', document.id)
                .where('anno', '==', 2020).get().then(async blockedMonths => {

                    console.log('CURRENT MONTH: ' + currentMonth + ' ' + currentMonth.length)

                    if (blockedMonths.size != 0) {

                        employees[i].meseSuccessivoBloccato = true

                        console.log('BLOCCATO')

                    }

                    await db.collection('SmartWorking').where('dipendente', '==', document.id).get().then(collection => {

                        collection.forEach(date => {
                            
                            var newDate = new Date(parseInt(date.data().anno), parseInt(date.data().mese) -1, parseInt(date.data().giorno))
    
                            if (newDate >= today)
    
                                employees[i].calendario.push({giorno: date.data().giorno, mese: date.data().mese, anno: date.data().anno})
    
                            employees[i].calendario.sort(function(data1, data2) {
                                if (data1 <= data2)    return -1;
                                else if (data1 >= data2) return  1;
                                else                      return  0;
                              })
    
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

            }).catch(error => {return response.send({hasError: true, error: error.message})})

        })

    }).catch(error => {return response.send({hasError: true, error: error.message})})
}