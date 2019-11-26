const firebase = require("firebase/app");
require("firebase/firestore");

module.exports = async (request, response) => {
    response.append('Access-Control-Allow-Origin', ['*'])

    var token = request.query.token
    var uid = request.query.uid
    if((token === undefined) || (uid === undefined)){
        response.send({hasError: true})
    }

    var db = firebase.firestore()

    db.collection('Tokens').doc(uid).set({
        token: token
    }).then( () => {
        response.send({hasError: false})
    }).catch( () => {
        response.send({hasError: true})
    })
}