const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var floor = request.query.floor

    response.append('Access-Control-Allow-Origin', ['*'])

    if (floor === undefined){
        return response.send({hasError: true, error: "Floor undefined"})
    }

    var rooms = []

    await db.collection('Stanze').where('piano', '==', floor).get().then(snapshot => {

        snapshot.forEach(elem => {

            rooms.push({stanza: elem.data().stanza, planimetria: elem.data().planimetria})

        })

        return response.send(rooms)

    }).catch(error => {return response.send({hasError: true, error: error.message})})
}