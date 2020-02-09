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
const getProjectBlockedDays = require('./src/manager/getProjectBlockedDays');
const blockSW = require('./src/manager/blockSW');
const getFloors = require('./src/planimetry/getFloors');
const getRooms = require('./src/planimetry/getRooms');
const getPlanimetry = require('./src/planimetry/getPlanimetry');
const checkAlreadyBookedUp = require('./src/planimetry/checkAlreadyBookedUp');
const bookPosition = require('./src/planimetry/bookPosition');
const home = require('./src/login/home');
const adminHome = require('./src/admin/home');
const getManagers = require('./src/admin/getManagers');
const insertEmployee = require('./src/admin/insertEmployee');
const getAllEmployees = require('./src/admin/getAllEmployees');
const insertProject = require('./src/admin/insertProject');
const getAllProjects = require('./src/admin/getAllProjects');
const getAssociatedUsers = require('./src/admin/getAssociatedUsers');
const associateEmployees = require('./src/admin/associateEmployees');

module.exports = {
  //'isManager': functions.region('europe-west1').https.onRequest(isManagerModule),
  //'checkSWAlreadyEntered': functions.region('europe-west1').https.onRequest(checkSWAlreadyEnteredModule),
  //'saveSW': functions.region('europe-west1').https.onRequest(saveSW),
  //'checkWhoInSW': functions.region('europe-west1').https.onRequest(checkWhoInSW),
  //'getAssignedUsers': functions.region('europe-west1').https.onRequest(getAssignedUsers),
  //'getProjects': functions.region('europe-west1').https.onRequest(getProjects),
  //'saveToken': functions.region('europe-west1').https.onRequest(saveTokenModule),
  //'deleteToken': functions.region('europe-west1').https.onRequest(deleteTokenModule),
  //'notification': functions.region('europe-west1').https.onRequest(notificationModule),
  //'blockSWDay': functions.region('europe-west1').https.onRequest(blockSWDay),
  //'getProjectBlockedDays': functions.region('europe-west1').https.onRequest(getProjectBlockedDays),
  //'blockSW': functions.region('europe-west1').https.onRequest(blockSW),
  //'getFloors': functions.region('europe-west1').https.onRequest(getFloors),
  //'getRooms': functions.region('europe-west1').https.onRequest(getRooms),
  //'getPlanimetry': functions.region('europe-west1').https.onRequest(getPlanimetry),
  //'checkAlreadyBookedUp': functions.region('europe-west1').https.onRequest(checkAlreadyBookedUp),
  //'home': functions.region('europe-west1').https.onRequest(home),
  //'bookPosition': functions.region('europe-west1').https.onRequest(bookPosition),
  //'getAllEmpoyees': functions.region('europe-west1').https.onRequest(getAllEmpoyees),
  //'getTodaySmartWorkers': functions.region('europe-west1').https.onRequest(getTodaySmartWorkers),
  //'adminHome': functions.region('europe-west1').https.onRequest(adminHome),
  //'getManagers': functions.region('europe-west1').https.onRequest(getManagers),
  //'insertEmployee': functions.region('europe-west1').https.onRequest(insertEmployee),
  //'getAllEmployees': functions.region('europe-west1').https.onRequest(getAllEmployees),
  //'insertProject': functions.region('europe-west1').https.onRequest(insertProject),
  //'getAllProjects': functions.region('europe-west1').https.onRequest(getAllProjects),
  //'getAssociatedUsers': functions.region('europe-west1').https.onRequest(getAssociatedUsers),
  'associateEmployees': functions.region('europe-west1').https.onRequest(associateEmployees)
};
