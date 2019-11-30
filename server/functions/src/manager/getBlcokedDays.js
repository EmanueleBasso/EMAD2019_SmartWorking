const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {

    var uid = request.query.uid
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        response.send({hasError: true, error: "UID undefined"})
        
    }

    var isManager = false
    var blockedDates = []
    var flag = 1

    await db.collection('Dipendente').doc(uid)
    .get().then( (snapshot) => {

        if (snapshot.data().manager == true) {
            
            isManager = true

        }

    }).catch(() =>  {return response.send({hasError: true})})

    if (isManager) {

        console.log('Sei un manager!')

        await db.collection('Progetto').where('manager', '==', uid).get()
        .then(snapshot => {

            snapshot.forEach(async elem => {

                await db.collection('GiorniBloccati').where('progetto', '==', elem.id).get()
                    .then(collection => {

                    utils.sendBlockedDays(response, collection, blockedDates, flag, snapshot.size)

                    flag++

                }).catch(error => {return response.send({hasError: true, error: error.message})})

            })

        }).catch(error => {return response.send({hasError: true, error: error.message})})

    } else {

        console.log('Spiacenti, non sei un manager!')

        await db.collection("AssociazioneDipendenteProgetto").where('dipendente', '==', uid).get().then(async snapshot => {

            if (snapshot.size != 0) {
    
                snapshot.forEach(async elem => {

                    await db.collection('GiorniBloccati').where('progetto', '==', elem.data().progetto).get()
                        .then(collection => {
    
                        utils.sendBlockedDays(response, collection, blockedDates, flag, snapshot.size)

                        flag++
    
                    }).catch(error => {return response.send({hasError: true, error: error.message})})
    
                })
    
            } else {
    
                return response.send({hasError: true, error: 'Non sei stato ancora assegnato ad alcun progetto'})
    
            }
    
        }).catch(error => {return response.send({hasError: true, error: error.message})})

    } 

}