const express = require('express');
const router = express.Router();

const { PageController } = require('./../controllers');
router.post('', PageController.create);
router.get('/all', PageController.getAll);

module.exports = router;