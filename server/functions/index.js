const functions = require('firebase-functions');
const firebase = require("firebase/app");

const firebaseConfig = {
    apiKey: 'AIzaSyCFS_Kx9pZVoYinGyO92SKM_HEgWPdHK7Q',
    authDomain: 'smart-working-5f3ea.firebaseapp.com',
    databaseURL: 'https://smart-working-5f3ea.firebaseio.com',
    projectId: 'smart-working-5f3ea',
    storageBucket: 'smart-working-5f3ea.appspot.com',
    messagingSenderId: '1072133615988',
    appId: '1:1072133615988:web:6f748c0c8a537e7ff4bc21',
    measurementId: 'G-HR9ZDFD32P'
  };

firebase.initializeApp(firebaseConfig);

const checkSWAlreadyEnteredModule = require('./src/sw/checkSWAlreadyEntered');
const saveSW = require('./src/sw/saveSW');
const checkWhoInSW = require('./src/manager/checkWhoInSW');
const getAssignedUsers = require('./src/manager/getAssignedUsers');

module.exports = {
  'checkSWAlreadyEntered': functions.region('europe-west1').https.onRequest(checkSWAlreadyEnteredModule),
  'saveSW': functions.region('europe-west1').https.onRequest(saveSW),
  'checkWhoInSW': functions.region('europe-west1').https.onRequest(checkWhoInSW),
  'getAssignedUsers': functions.region('europe-west1').https.onRequest(getAssignedUsers)
};