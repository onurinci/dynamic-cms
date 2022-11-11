const express = require('express');
const router = express.Router();

const { InternationalizationController } = require('./../controllers');
router.post('', InternationalizationController.create);
router.get('/', InternationalizationController.getAll);

module.exports = router;