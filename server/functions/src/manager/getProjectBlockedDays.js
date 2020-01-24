const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {

    var project = request.query.project
    var blockedDates = []
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (project === undefined) {

        return response.send({hasError: true, error: "Project undefined"})
        
    }

    var today = new Date()

    await db.collection('GiorniBloccati').where('progetto', '==', project)
        .get()
        .then(collection => {
            
            collection.forEach(blocked => {

                var date = new Date(parseInt(blocked.data().anno), parseInt(blocked.data().mese) - 1, parseInt(blocked.data().giorno))

                if (date.getTime() >= today.getTime())

                    blockedDates.push({giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno})

            })

            return response.send(blockedDates)

        }).catch(error => {return response.send({hasError: true, error: error.message})})

}