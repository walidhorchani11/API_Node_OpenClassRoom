const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
//importer le middleware pour securiser les routes voulu
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//ajouter  le middleware auth pour appliquer la securiter au routes
router.post('/',auth, multer, stuffCtrl.creatThing);
router.get('/:id',auth, stuffCtrl.getOneThing);
router.get('/',auth, stuffCtrl.getThings);
router.delete('/:id',auth, stuffCtrl.deleteThing);
router.put('/:id',auth, multer, stuffCtrl.updateThing);

module.exports = router;