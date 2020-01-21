const firebase = require("firebase/app");
require("firebase/storage")
global.XMLHttpRequest = require("xhr2");

const storage = firebase.storage();


module.exports = async (request, response) => {

    var nameFile = request.query.nameFile

    response.append('Access-Control-Allow-Origin', ['*'])

    if (nameFile === undefined){
        return response.send({hasError: true, error: "Name file undefined"})
    }

    storage.ref().child(nameFile).getDownloadURL().then( (url) => {
        var xhr = new XMLHttpRequest();

        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;

          response.send({file: blob})
        };
        xhr.open('GET', url);
        xhr.send();
      }).catch(function(error) {
        response.send({hasError: true, error: error.message})
    });

}
