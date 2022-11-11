const express = require('express');
const router = express.Router();

const { MediaController } = require('./../controllers');
router.post('', MediaController.create);
router.get('/all', MediaController.getAll);

module.exports = router;