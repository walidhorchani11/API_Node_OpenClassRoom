const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
//importer le middleware pour securiser les routes voulu
const auth = require('../middleware/auth');

//ajouter  le middleware auth pour appliquer la securiter au routes
router.post('/',auth, stuffCtrl.creatThing);
router.get('/:id',auth, stuffCtrl.getOneThing);
router.get('/',auth, stuffCtrl.getThings);
router.delete('/:id',auth, stuffCtrl.deleteThing);
router.put('/:id',auth, stuffCtrl.updateThing);

module.exports = router;