const express = require('express');
const router = express.Router();

const { PageAdminController } = require('./../controllers');
router.post('', PageAdminController.create);
router.get('/all', PageAdminController.getAll);
router.get('/:id/:locale', PageAdminController.getById);
router.get('/:id', PageAdminController.getByOnlyId);
router.post('/:id/content/save', PageAdminController.contentSave);
router.post('/:id/content/addItem', PageAdminController.addItem);
router.post('/:id/deleteBuilderControl', PageAdminController.deleteBuilderControl);
router.post('/:id/createControl', PageAdminController.createControl);

module.exports = router;