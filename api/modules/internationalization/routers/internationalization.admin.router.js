const express = require('express');
const router = express.Router();

const { InternationalizationAdminController } = require('./../controllers');
router.post('', InternationalizationAdminController.create);
router.get('/', InternationalizationAdminController.getAll);
router.post('/changeDefaultLang', InternationalizationAdminController.setDefaultLang)

module.exports = router;
