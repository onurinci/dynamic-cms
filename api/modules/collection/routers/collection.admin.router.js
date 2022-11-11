const express = require('express');
const router = express.Router();

const { CollectionAdminController } = require('./../controllers');
router.post('', CollectionAdminController.create);
router.get('/all', CollectionAdminController.getAll);
router.get('/:id/:locale', CollectionAdminController.getById);
router.post('/:id/content/save', CollectionAdminController.contentSave);
router.post('/:id/content/addItem', CollectionAdminController.addItem);

module.exports = router;