const utils = require('../utils/utils');
const db = utils.db;
const auth = utils.auth;

module.exports = async (request, response) => {

    var name = request.query.name
    var surname = request.query.surname
    var email = request.query.email
    var manager = request.query.manager
    var batch = db.batch()
    var password = Math.random().toString(36).slice(-8);

    response.append('Access-Control-Allow-Origin', ['*'])

    if (name === undefined || surname === undefined || email === undefined || manager === undefined) {

        return response.send({hasError: true, error: "Data undefined"})

    }

    if (manager == 'false')
        manager = false
    
    if (manager == 'true')
        manager = true

    await db.collection('Dipendente').where('email', '==', email).get().then(async doc => {

        if (doc.size > 0) {

            return response.send({hasError: true, error: 'L\'email inserita è già in utilizzo'})

        } else {

            var newUser = db.collection('Dipendente').doc()

            batch.set(newUser, {

                nome: name,
                cognome: surname,
                email: email,
                manager: manager,
                password: password
        
            })
            
            batch.commit().then(async () => {

                await auth.createUserWithEmailAndPassword(email, password).then(() => {

                    utils.sendCredentialsEmail(name, surname, email, password, request, response)

                })
            
            }).catch(error => {return response.send({hasError: true, error: error.message})})

        }

    })

}