const firebase = require("firebase/app");
require("firebase/firestore");

module.exports = async (request, response) => {
    var uid = request.query.uid

    response.append('Access-Control-Allow-Origin', ['*'])

    if (uid === undefined){
        return response.send({hasError: true, error: "UID undefined"})
    }

    await firebase.firestore().collection('Dipendente').doc(uid)
    .get().then( (snapshot) => {
        if (snapshot.data().manager == true) {
            response.send({hasError: false, isManager: true})
        } else {
            response.send({hasError: false, isManager: false})
        }
    }).catch(() => response.send({hasError: true}))
};
