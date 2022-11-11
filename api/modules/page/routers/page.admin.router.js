const express = require('express');
const router = express.Router();

const { PageAdminController } = require('./../controllers');
router.post('', PageAdminController.create);
router.get('/all', PageAdminController.getAll);
router.get('/:id/:locale', PageAdminController.getById);
router.post('/:id/content/save', PageAdminController.contentSave);
router.post('/:id/content/addItem', PageAdminController.addItem);

module.exports = router;