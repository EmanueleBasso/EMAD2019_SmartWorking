const firebase = require("firebase/app");
require("firebase/firestore");

module.exports = async (request, response) => {
    var uid = request.query.uid

    if(uid === undefined){
        response.send({hasError: true, error: "UID undefined"})
    }

    var db = firebase.firestore()

    response.append('Access-Control-Allow-Origin', ['*'])

    await db.collection('SmartWorking').where('dipendente', '==', uid).get().then( (snapshot) => {
        arrayDate = []
        snapshot.forEach(elem => {
            arrayDate.push(elem.data().data)
        });

        arrayDateSorted = arrayDate.sort(function(o1, o2) {
            arrayData1 = o1.split('-')
            data1 = new Date(arrayData1[2], arrayData1[1], arrayData1[0])

            arrayData2 = o2.split('-')
            data2 = new Date(arrayData2[2], arrayData2[1], arrayData2[0])

            if (data1.getTime() < data2.getTime())    return -1;
            else if(data1.getTime() > data2.getTime()) return  1;
            else                      return  0;
        });

        var lastMonthEntered = arrayDateSorted.pop().split('-')[1]
        var month = (new Date()).getMonth() + 2

        if(lastMonthEntered == month){
            response.send({alreadyEntered: true})
        } else{
            response.send({alreadyEntered: false})
        }
    }).catch(() => response.send({alreadyEntered: false}))
};
