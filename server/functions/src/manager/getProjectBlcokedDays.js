const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {

    var project = request.query.project
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (project === undefined) {

        response.send({hasError: true, error: "Project undefined"})
        
    }

    var date = new Date()
    var blockedDates = []

    await db.collection('GiorniBloccati').where('progetto', '==', project)
        .get()
        .then(collection => {
            
            collection.forEach(blocked => {

                if (blocked.data().giorno >= date.getDay() && blocked.data().mese >= date.getMonth() + 1 && blocked.data().anno >= date.getFullYear())

                    blockedDates.push({giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno})

            })

            return response.send(blockedDates)

        }).catch(error => {return response.send({hasError: true, error: error.message})})

}