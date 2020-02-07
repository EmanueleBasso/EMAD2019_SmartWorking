const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var name = request.query.name
    var description = request.query.description
    var manager = request.query.manager

    response.append('Access-Control-Allow-Origin', ['*'])

    if(name === undefined || description === undefined || manager === undefined){

        return response.send({hasError: true, error: "Data undefined"})
    }
       
    await db.collection('Progetto').add({
        nome: name,
        descrizione: description,
        manager: manager
    }).then(() => {

        return response.send({hasError: false})

    }).catch(error => {return response.send({hasError: true, error: error.message})})
 
}