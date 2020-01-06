const utils = require('../utils/utils');
const db = utils.db;

module.exports = async (request, response) => {

    var uid = request.query.uid

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        return response.send({hasError: true, error: "UID undefined"})

    }

    var date = new Date()
    var currentMonth = date.getMonth() + 1

    await db.collection('Dipendente')
    .doc(uid).get().then( async (doc) => {

        if (doc.data().meseBloccato != undefined && doc.data().meseBloccato === (currentMonth + 1)) {

            return response.send({blocked: true, message: 'Non ti è permesso programmare lo Smart Working per il prossimo mese'})
            
        } else {

            var next_month = (new Date()).getMonth() + 2
            var year = (new Date()).getFullYear()
            
            if (next_month === 13) {
                next_month = 1
                year = year + 1
            }
        
            await db.collection('SmartWorking')
            .where('dipendente', '==', uid)
            .where('anno', '==', year + '')
            .where('mese', '==', next_month + '')
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
