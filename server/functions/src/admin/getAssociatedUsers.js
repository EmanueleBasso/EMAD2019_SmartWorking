const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var project = request.query.project
    var all = []
    var ids = []
    var associated = []
    var nonAssociated = []
    var count = 0
    var found = false

    response.append('Access-Control-Allow-Origin', ['*'])

    await db.collection('Dipendente').get().then(async snapshot => {

        snapshot.forEach(elem => {

            all.push({nome: elem.data().nome, cognome: elem.data().cognome, email: elem.data().email, id: elem.id})

        })

        await db.collection('AssociazioneDipendenteProgetto').where("progetto", "==", project).get().then(projects => {
            projects.forEach(element => {

                ids.push({id: element.data().dipendente})

            })

            for (i = 0; i < all.length; i++) {
                found = false

                for ( j = 0; j < ids.length; j++) {

                    if (all[i].id == ids[j].id) {

                        found = true

                        break

                    }

                }

                if (!found) {

                    nonAssociated.push({nome: all[i].nome, cognome: all[i].cognome, email: all[i].email, id: all[i].id})

                } else {

                    associated.push({nome: all[i].nome, cognome: all[i].cognome, email: all[i].email, id: all[i].id})

                    count++

                }

                if (count == ids.length && i < all.length) {

                    for (k = i + 1; k < all.length; k++) {

                        nonAssociated.push({nome: all[k].nome, cognome: all[k].cognome, email: all[k].email, id: all[k].id})

                    }

                    break

                }

            }

            return response.send({hasError: false, daAssociare: nonAssociated, associati: associated})

        }).catch(error => {return response.send({hasError: true, error: error.message})})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}