const firebase = require("firebase/app");
require("firebase/firestore");

module.exports = async (request, response) => {
    response.append('Access-Control-Allow-Origin', ['*'])

    var uid = request.query.uid
    if(uid === undefined){
        response.send({hasError: true, error: "UID undefined"})
    }

    var next_month = (new Date()).getMonth() + 2
    var year = (new Date()).getFullYear()
    if (next_month === 13) {
        next_month = 1
        year = year + 1
    }

    var db = firebase.firestore()

    await db.collection('SmartWorking')
    .where('dipendente', '==', uid)
    .where('anno', '==', year + '')
    .where('mese', '==', next_month + '')
    .get().then( (snapshot) => {
        if (snapshot.size != 0) {
            response.send({alreadyEntered: true})
        } else {
            response.send({alreadyEntered: false})
        }
    }).catch(() => response.send({alreadyEntered: false}))
};
