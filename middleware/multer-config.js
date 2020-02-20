const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}

//creer un objet de configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //premiere argument null , pour dire qu'il n ya pas d'erreur à ce niveau la 
    callback(null, 'images')
  },
  //il faut le faire pour eviter de mettre les noms d'origine, en cas ou deux noms seront identiques
  filename: (req, file, callback) => {
    //il faut enlever les espaces car il cause probleme eu serveur, et de les remplacer par exp par _
    const name = file.originalname.split(' ').join('_');
    //creer l extension selon le mimetypes du file
    const extension = MIME_TYPES[file.mimetype];

    //on ajout un timestamp avec Date.now() pour rendre le nom unique 
    callback(null, name + Date.now() + '.' + extension);
  }
});
