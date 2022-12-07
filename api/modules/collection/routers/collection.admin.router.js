const express = require('express');
const router = express.Router();

const { CollectionAdminController } = require('./../controllers');
router.post('', CollectionAdminController.create);
router.get('/all', CollectionAdminController.getAll);
router.get('/:id/:locale', CollectionAdminController.getById);
router.post('/:id/content/save', CollectionAdminController.contentSave);
router.post('/:id/content/addItem', CollectionAdminController.addItem);
router.post('/:id/content/update', CollectionAdminController.update);
router.get('/:id/:locale/:entryId', CollectionAdminController.getEntryDetails);

module.exports = router;
