const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var progetto = request.query.progetto
    var listaDipendentiStr = request.query.lista

    response.append('Access-Control-Allow-Origin', ['*'])

    if(progetto === undefined || listaDipendentiStr === undefined || listaDipendentiStr.length === 0){

        return response.send({hasError: true, error: "Data undefined"})
    }

    listaDipendenti = listaDipendentiStr.split(",")

    flag = 0
    listaDipendenti.forEach(async element => {
        await db.collection('AssociazioneDipendenteProgetto').add({
            dipendente: element,
            progetto: progetto
        }).then(() => {
            flag++
    
            if(flag === listaDipendenti.length){
                return response.send({hasError: false})
            }
        }).catch(error => {return response.send({hasError: true, error: error.message})})
    });
}
