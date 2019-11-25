const firebase = require("firebase/app");
require("firebase/firestore")

const db = firebase.firestore();

module.exports = {
    'db': db
}