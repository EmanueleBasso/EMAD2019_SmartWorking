const admin = require('firebase-admin');

module.exports = async (request, response) => {
    response.append('Access-Control-Allow-Origin', ['*'])

    const db = admin.firestore()

    await db.collection('Tokens').get().then((collection) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)

        collection.forEach((elem) => {
            const uid = elem.id
            const token = elem.data().token

            db.collection('SmartWorking')
            .where('dipendente', '==', uid)
            .where('anno', '==', tomorrow.getFullYear() + '')
            .where('mese', '==', (tomorrow.getMonth() + 1) + '')
            .where('giorno', '==', tomorrow.getDate() + '')
            .get().then( (snapshot) => {
                if (snapshot.size != 0) {
                    const message = {
                        notification:{
                            title: "Il team Smart Working",
                            body: "Ciao, volevamo ricordarti che domani lavorerai da casa."
                        },
                        data: {
                            body: 'SW'
                        },
                        token: token
                    }

                    admin.messaging().send(message);
                }
            })
        })

        response.send();
    }); 
}
