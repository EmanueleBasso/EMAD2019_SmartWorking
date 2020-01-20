const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var uid = request.query.uid

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        return response.send({hasError: true, error: "UID undefined"})

    }

    var today = new Date()
    var monthOfInteresst = (today.getMonth() + 2) + ''
    var yearOfInterest = today.getFullYear() + ''

    if (monthOfInteresst == '13') {

        monthOfInteresst = '1'
        yearOfInterest = (today.getFullYear() + 1) + ''

    }

    await db.collection('DipendentiBloccati')
    .where('dipendente', '==', uid)
    .where('mese', '==', monthOfInteresst)
    .where('anno', '==', yearOfInterest).get().then(async blockedMonths => {

        if (blockedMonths.size != 0) {

            return response.send({blocked: true, message: 'Non ti è permesso programmare lo Smart Working per il prossimo mese'})
            
        } else {
        
            await db.collection('SmartWorking')
            .where('dipendente', '==', uid)
            .where('anno', '==', yearOfInterest)
            .where('mese', '==', monthOfInteresst)
            .get().then( (snapshot) => {
        
                if (snapshot.size != 0) {
        
                    return response.send({alreadyEntered: true})
        
                } else {
        
                    return response.send({alreadyEntered: false})
        
                }
        
            }).catch(() => {return response.send({alreadyEntered: false})})

        }

    }).catch(() => {return response.send({blocked: false})})

};
