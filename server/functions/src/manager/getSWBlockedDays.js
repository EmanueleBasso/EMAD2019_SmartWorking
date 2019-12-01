const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var uid = request.query.uid
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        response.send({hasError: true, error: "UID undefined"})
        
    }

    var blockedDates = []
    var flag = 1

    await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

        if (snapshot.size != 0) {

            snapshot.forEach(async elem => {

                await db.collection('GiorniBloccati').where('progetto', '==', elem.data().progetto).get()
                    .then(collection => {

                        if (collection.size != 0) {
            
                            collection.forEach(blocked => {
                
                                if (!utils.containsDate(blocked, blockedDates))
                
                                    blockedDates.push({giorno: blocked.data().giorno, mese: blocked.data().mese, anno: blocked.data().anno})
                
                            })
                
                            if (flag == snapshot.size)
                
                                return response.send(blockedDates)

                            else

                                flag++
                
                        } else {

                            flag++

                        }

                }).catch(error => {return response.send({hasError: true, error: error.message})})

            })

        } else {

            return response.send({hasError: true, error: 'Non sei stato ancora assegnato ad alcun progetto'})

        }

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}