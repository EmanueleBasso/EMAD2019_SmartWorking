const utils = require('../utils/utils');
const db = utils.db;


module.exports = async(request, response) => {

    var day = request.query.day
    var month = request.query.month
    var year = request.query.year
    var project = request.query.project
    var flag = 1
    
    response.append('Access-Control-Allow-Origin', ['*'])

    if (project === undefined || day === undefined || month === undefined || year === undefined) {

        response.send({hasError: true, error: "There was an error"})
        
    }

    await db.collection('AssociazioneDipendenteProgetto').where('progetto', '==', project).get()
    .then(rels => {

        rels.forEach(async rel => {

            await db.collection('SmartWorking').where('dipendente', '==', rel.data().dipendente)
            .where('giorno', '==', day)
            .where('mese', '==', month)
            .where('anno', '==', year)
            .get()
            .then(async days => {

                if (days.size != 0)

                    await db.collection('SmartWorking').doc(days.docs[0].id).delete().then(() => {

                        console.log('Giorno cancellato con successo dai calendari dei dipendenti associati!')

                    }).catch(error => {return response.send({hasError: true, error: error.message})})

                if (flag == rels.size) {
        
                    db.collection('GiorniBloccati').add({giorno: day, mese: month, anno: year, progetto: project}).then(() => {
        
                        console.log('Giorno bloccato con successo!')
        
                        return response.send({hasError: false, message: 'Giorno bloccato con successo!'})
        
                    }).catch(error => {return response.send({hasError: true, error: error.message})})
        
                } else {
        
                    flag++
        
                }

            }).catch(error => {return response.send({hasError: true, error: error.message})})

        })

    }).catch(error => {return response.send({hasError: true, error: error.message})})

}