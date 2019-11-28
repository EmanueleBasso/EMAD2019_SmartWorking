const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var uid = request.query.uid

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined){
        return response.send({hasError: true, error: "UID undefined"})
    }

    var projects = []

    db.collection('Progetto').where('manager', '==', uid).get().then(snapshot => {

        snapshot.forEach(elem => {

            projects.push({id: elem.id, nome: elem.data().nome})

        })

        response.send(projects)

    }).catch(error => {return response.send({hasError: true, error: error.message})})
}