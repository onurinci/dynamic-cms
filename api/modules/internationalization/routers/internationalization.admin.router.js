const express = require('express');
const router = express.Router();

const { InternationalizationAdminController } = require('./../controllers');
router.post('', InternationalizationAdminController.create);
router.get('/', InternationalizationAdminController.getAll);

module.exports = router;