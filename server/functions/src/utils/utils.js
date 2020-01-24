const firebase = require("firebase/app");
require("firebase/firestore")
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

const db = firebase.firestore();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'smartworking.unisa@gmail.com',
        pass: 'SWunisa2019'
    }
});


module.exports = {

    'sortDates': function sortDates(dates) {
        let sortedDates = dates.sort((first, second) => {
                        
            const data_1 = new Date(parseInt(first.anno), parseInt(first.mese), parseInt(first.giorno));
            const data_2 = new Date(parseInt(second.anno), parseInt(second.mese), parseInt(second.giorno));
    
            if (data_1.getTime() < data_2.getTime()) {
                return -1;
            } else if (data_1.getTime() > data_2.getTime()){
                return 1;
            } else {
                return  0;
            } 

        })

        return sortedDates;
    },

    'getWeekNumber': function getWeekNumber(elem) {
        const d = new Date(Date.UTC(parseInt(elem.anno), parseInt(elem.mese), parseInt(elem.giorno)));

        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);

        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    },

    'containsDate': function containsDate(date, dates) {
        let flag = false

        for (i = 0; i < dates.length; i++) {

            if (date.giorno == dates[i].giorno && date.mese == dates[i].mese && date.anno == dates[i].anno) {

                flag = true

                break

            }

        }

        return flag;

    },

    'getBlockedDates': function getBlockedDates(blocked, dates) {
        let blockedDates = []
        
        blocked.forEach(elemBlocked => {

            dates.forEach(elemToAdd => {

                if (elemBlocked.giorno == elemToAdd.giorno && elemBlocked.mese == elemToAdd.mese && elemBlocked.anno == elemToAdd.anno) {
                    
                    blockedDates.push({giorno: elemToAdd.giorno, mese: elemToAdd.mese, anno: elemToAdd.anno})

                }
                
            })

        })

        return blockedDates;

    },

    'areValidDates': function areValidDates(dates) {
        let week = 0;
        let occurrences = 1;
        let flag = true;

        for (i = 0; i < dates.length; i++) {

            week = this.getWeekNumber(dates[i])

            for(j = 0; j < dates.length; j++) {
                if (j == i)
                    continue;
                
                else {
                    if (week == this.getWeekNumber(dates[j]))
                        occurrences++;
                }
            }

            if (occurrences > 2) {
                flag = false

                break;

            } else {

                occurrences = 1
            }
        }

        return flag;
    },

    'addDates': function addDates(dates, uid, batch) {
        let doc;

        dates.forEach(elem => {
            doc = db.collection("SmartWorking").doc();

            batch.set(doc, {
                giorno: elem.giorno,
                mese: elem.mese,
                anno: elem.anno,
                dipendente: uid
            })
        })
    },

    'deletePositions': async function deletePositions(dates, uid, response) {

        dates.forEach(async elem => {

            await db.collection('PostazioniOccupate').where('giorno', '==', elem.giorno)
            .where('mese', '==', elem.mese)
            .where('anno', '==', elem.anno)
            .where('dipendente', '==', uid).get().then(datesPositions => {

                if (datesPositions.size != 0) {

                    datesPositions.forEach(position => {

                        db.collection('PostazioniOccupate').doc(position.id).delete()

                    })

                }

            }).catch(error => {return response.send({hasError: true, error: error.message})})

        })

    },

    'createSmartWorkingCalendarForEmail': function createSmartWorkingCalendarForEmail(dates) {
        let s = "";

        for (i = 0; i < dates.length; i++) {
            date = dates[i].giorno + "/" + dates[i].mese + "/" + dates[i].anno
            s = s
            + "<div style=\"display: flex; align-items: center; justify-content: center; flex-direction: row\">"
            + "<p style=\"font-size: 20px; font-weight: bold; margin-left: 15px;\">"+ date +"</p>"
            + "</div>"
        }

        return s;
    },

    'sendSmartWorkingCalendar': function sendSmartWorkingCalendar(uid, request, response, dates) {

        db.collection('Dipendente').doc(uid).get().then(document => {
            
            cors(request, response, () => {
        
                const mailOptions = {
                    from: 'Amministratore Smart Working<smartworking.unisa@gmail.com>',
                    to: 'antonio.basileo92@gmail.com',
                    subject: 'Piano di Smart Working',
                    html: "<p style=\"font-size: 16px;\">Ciao " + document.data().nome + " " + document.data().cognome + ",</p>" 
                    + "<p style=\"font-size: 16px;\">ecco il tuo piano di Smart Working per il prossimo mese:</p>" 
                    + "<br /> "
                    + "<div style=\"background-color: #fafafa; padding: 15px\">"
                    + this.createSmartWorkingCalendarForEmail(dates)
                    + "</div>"
                    + "<br /> "
                    + "<p style=\"font-size: 16px;\">Cordiali saluti,</p>"
                    + "<p style=\"font-size: 16px;\">il team Smart Working</p>"

                };
                                    
                return transporter.sendMail(mailOptions, (error, info) => {

                    if (error){

                        return response.send({hasError: true, error: error.message});

                    } else {

                        return response.send({hasError: false});
                    }

                });
            });  

        }).catch(error => response.send({hasError: true, error: error.message}))

    },

    'saveSW': async function(request, response, uid, dates, batch) {

        await db.collection('SmartWorking').where('dipendente', '==', uid).get().then(async snapshot => {
                        
            if (snapshot.size == 0) {

                await this.deletePositions(dates, uid, response).then(() => {
                
                    this.addDates(dates, uid, batch)
        
                    this.sendSmartWorkingCalendar(uid, request, response, dates)
                            
                    batch.commit().then(() => {
        
                        console.log('DATI INSERITI ED EMAIL INVIATA CON SUCCESSO!')
    
                    })

                }).catch(error => {return response.send({hasError: true, error: error.message})})
    
            } else {

                let prevCollection = []
                let current_month = new Date().getMonth() + 1
    
                prevCollection = snapshot.docs.filter(elem => elem.data().mese == current_month)

                if (prevCollection.length == 0 || prevCollection.length == 1 && dates.length == 1) {

                    await this.deletePositions(dates, uid, response).then(() => {
                    
                        this.addDates(dates, uid, batch)
            
                        this.sendSmartWorkingCalendar(uid, request, response, dates)
                                
                        batch.commit().then(() => {
            
                            console.log('MESE PRECEDENTE VUOTO OPPURE DATE COMPATIBILI. DATI INSERITI ED EMAIL INVIATA CON SUCCESSO!')
        
                        })
    
                    }).catch(error => {return response.send({hasError: true, error: error.message})})
            
                } else {
    
                    let prevDatesSorted = []
                    let newDatesSorted = []
                    let compareArray = []
                    
                    prevCollection.forEach(elem => {
                        prevDatesSorted.push({
                            giorno: elem.data().giorno,
                            mese: elem.data().mese,
                            anno: elem.data().anno,
                            dipendente: elem.data().dipendente
                        })
                    })
        
                    prevDatesSorted = this.sortDates(prevDatesSorted)
                    newDatesSorted = this.sortDates(dates)
        
                    if (prevDatesSorted.length > 1) {

                        compareArray.push(prevDatesSorted[prevDatesSorted.length - 1])
                        compareArray.push(prevDatesSorted[prevDatesSorted.length - 2])

                    } else {

                        compareArray.push(prevDatesSorted[0])

                    }
        
                    if (newDatesSorted.length > 1) {

                        compareArray.push(newDatesSorted[newDatesSorted.length - 1])
                        compareArray.push(newDatesSorted[newDatesSorted.length - 2])

                    } else {

                        compareArray.push(newDatesSorted[0])
                        
                    }
        
                    if (this.areValidDates(compareArray)) {

                        await this.deletePositions(dates, uid, response).then(() => {
                        
                            this.addDates(dates, uid, batch)
                
                            this.sendSmartWorkingCalendar(uid, request, response, dates)
                                    
                            batch.commit().then(() => {
                
                                console.log('DATE VALIDE ED EMAIL INVIATA CON SUCCESSO!') 
            
                            })
        
                        }).catch(error => {return response.send({hasError: true, error: error.message})})
                            
                    } else {
        
                       response.send({hasError: true, error: 'Hai selezionato più di due giorni di Smart Working nella stessa settimana a cavallo tra il mese corrente e il prossimo'})
                    }

                }

            }
            
        }).catch(error => {return response.send({hasError: true, error: error.message})})

    },

    'db': db

}