const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var allEmployees = 0
    var todaySmartWorkers = 0
    var today = new Date()
    var day = today.getDate() + ""
    var month = (today.getMonth() + 1) + ""
    var year = today.getFullYear() + ""

    response.append('Access-Control-Allow-Origin', ['*'])

    await db.collection('Dipendente').get().then(async snapshot => {

        allEmployees = snapshot.size

        await db.collection('SmartWorking').where("giorno", "==", day)
        .where("mese", "==", month)
        .where("anno", "==", year)
        .get().then(todaySnapshot => {

            if (todaySnapshot.size != 0) {

                todaySmartWorkers = todaySnapshot.size

            }

        }).catch(error => {return response.send({hasError: true, error: error.message})})

        return response.send({totale: allEmployees, sw: todaySmartWorkers, inAzienda: allEmployees - todaySmartWorkers})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}