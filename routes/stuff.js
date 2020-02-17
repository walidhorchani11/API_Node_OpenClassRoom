const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

router.post('/',stuffCtrl.creatThing);
router.get('/:id', stuffCtrl.getOneThing);
router.get('/', stuffCtrl.getThings);
router.delete('/:id',stuffCtrl.deleteThing);
router.put('/:id', stuffCtrl.updateThing);

module.exports = router;