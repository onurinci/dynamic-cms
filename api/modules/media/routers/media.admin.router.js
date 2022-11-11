const express = require('express');
const router = express.Router();
const { generateFilename } = require("./../../../core/helpers/utils");

const multer = require('multer');
const multerUploader = multer({
    storage: multer.diskStorage({
        destination: "uploads/media/",
        filename: (req, file, callback) => callback(null, generateFilename(file.originalname))
    })
});

const { MediaAdminController } = require('./../controllers');
router.post('', multerUploader.array('files'), MediaAdminController.create);
router.get('/', MediaAdminController.getAll);

module.exports = router;