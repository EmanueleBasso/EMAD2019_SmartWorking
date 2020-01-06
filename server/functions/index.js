const functions = require('firebase-functions');
const firebase = require("firebase/app");
const admin = require('firebase-admin');

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
admin.initializeApp();

const isManagerModule = require('./src/login/isManager');
const checkSWAlreadyEnteredModule = require('./src/sw/checkSWAlreadyEntered');
const saveSW = require('./src/sw/saveSW');
const saveTokenModule = require('./src/notification/saveToken')
const deleteTokenModule = require('./src/notification/deleteToken')
const notificationModule = require('./src/notification/notification')
const checkWhoInSW = require('./src/manager/checkWhoInSW');
const getAssignedUsers = require('./src/manager/getAssignedUsers');
const getProjects = require('./src/manager/getProjects');
const blockSWDay = require('./src/manager/blockSWDay');
const getProjectBlcokedDays = require('./src/manager/getProjectBlcokedDays');
const getSWBlockedDays = require('./src/manager/getSWBlockedDays');
const blockSW = require('./src/manager/blockSW');

module.exports = {
  'isManager': functions.region('europe-west1').https.onRequest(isManagerModule),
  'checkSWAlreadyEntered': functions.region('europe-west1').https.onRequest(checkSWAlreadyEnteredModule),
  'saveSW': functions.region('europe-west1').https.onRequest(saveSW),
  'checkWhoInSW': functions.region('europe-west1').https.onRequest(checkWhoInSW),
  'getAssignedUsers': functions.region('europe-west1').https.onRequest(getAssignedUsers),
  'getProjects': functions.region('europe-west1').https.onRequest(getProjects),
  'saveToken': functions.region('europe-west1').https.onRequest(saveTokenModule),
  'deleteToken': functions.region('europe-west1').https.onRequest(deleteTokenModule),
  'notification': functions.region('europe-west1').https.onRequest(notificationModule),
  'blockSWDay': functions.region('europe-west1').https.onRequest(blockSWDay),
  'getProjectBlcokedDays': functions.region('europe-west1').https.onRequest(getProjectBlcokedDays),
  'getSWBlockedDays': functions.region('europe-west1').https.onRequest(getSWBlockedDays),
  'blockSW': functions.region('europe-west1').https.onRequest(blockSW)
};
