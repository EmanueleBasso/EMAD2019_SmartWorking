const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var uid = request.query.uid
    var today = new Date()
    var blockedMonth = today.getMonth() + 2 + ''
    var blockedYear = today.getFullYear() + ''

    if (blockedMonth == '13') {

        blockedMonth = '1'
        blockedYear = (today.getFullYear() + 1) + ''

    }

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        return response.send({hasError: true, error: "There was an error"})
        
    }
    
    await db.collection('DipendentiBloccati').add({

        dipendente: uid,
        mese: blockedMonth,
        anno: blockedYear

    }).then(async() => {

        await db.collection('SmartWorking')
        .where('dipendente', '==', uid)
        .where('mese', '==', blockedMonth)
        .where('anno', '==', blockedYear).get().then(snapshot => {

            if (snapshot.size != 0) {

                snapshot.forEach(element => {
                    
                    db.collection('SmartWorking').doc(element.id).delete().then(() => {

                        console.log('DAY OF SW SUCCESFULLY DELETED!')

                        return response.send({hasError: false, message: 'SW del dipendente bloccato con successo!'})

                    }).catch(error => {return response.send({hasError: true, error: error.message})})

                });

            } else {

                return response.send({hasError: false, message: 'SW del dipendente bloccato con successo!'})

            }

        }).catch(error => {return response.send({hasError: true, error: error.message})})

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}