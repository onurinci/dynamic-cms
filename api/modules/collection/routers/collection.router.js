const express = require('express');
const router = express.Router();

const { CollectionController } = require('./../controllers');
router.post('', CollectionController.create);
router.get('/all', CollectionController.getAll);

module.exports = router;