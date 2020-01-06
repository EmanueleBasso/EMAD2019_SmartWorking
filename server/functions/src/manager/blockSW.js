const utils = require('../utils/utils');
const db = utils.db;


module.exports = async (request, response) => {

    var uid = request.query.uid
    var date = new Date()
    var currentMonth = date.getMonth() + 1

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined) {

        return response.send({hasError: true, error: "There was an error"})
        
    }
    
    await db.collection('Dipendente').doc(uid)
    .get().then((doc) => {

        db.collection('Dipendente').doc(uid).set({

            nome: doc.data().nome,
            cognome: doc.data().cognome,
            email: doc.data().email,
            password: doc.data().password,
            manager: doc.data().manager,
            meseBloccato: currentMonth + 1
    
        }).then(() => {

            return response.send({message: 'È stato bloccato il prossimo mese di Smart Working per il dipendente indicato'})

        }).catch(error => {return response.send({hasError: true, error: error.message})})
        
    }).catch(error => {return response.send({hasError: true, error: error.message})})

}