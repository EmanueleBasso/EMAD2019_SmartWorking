const firebase = require("firebase/app");
require("firebase/firestore");

module.exports = async (request, response) => {
    response.append('Access-Control-Allow-Origin', ['*'])

    var uid = request.query.uid
    if(uid === undefined){
        response.send({hasError: true})
    }

    var db = firebase.firestore()

    db.collection('Tokens').doc(uid).delete().then( () => {
        response.send({hasError: false})
    }).catch( () => {
        response.send({hasError: true})
    })
}