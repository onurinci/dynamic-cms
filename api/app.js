var express = require('express');
var app = express();
const http = require("http").createServer(app);
var cors = require('cors');
const path = require('path');
const helmet = require("helmet");
const dotenv = require("dotenv");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
dotenv.config();
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_FOLDER_NAME)));

const db = require("./config/database");
db.connect();

app.get('/healtCheck', async (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

// [page] module router
const { PageRouter, PageAdminRouter } = require('./modules/page/routers');
app.use("/api/page", PageRouter);
app.use("/api/admin/page", PageAdminRouter);

// [collection] module router
const { CollectionRouter, CollectionAdminRouter } = require('./modules/collection/routers');
app.use("/api/collection", CollectionRouter);
app.use("/api/admin/collection", CollectionAdminRouter);

// [media] module router
const { MediaRouter, MediaAdminRouter } = require('./modules/media/routers');
app.use("/api/media", MediaRouter);
app.use("/api/admin/media", MediaAdminRouter);

// [internationalization] module router
const { InternationalizationRouter, InternationalizationAdminRouter } = require('./modules/internationalization/routers');
app.use("/api/internationalization", InternationalizationRouter);
app.use("/api/admin/internationalization", InternationalizationAdminRouter);

// api/admin/page/6368c3fa9ebafce0c2f7e13e/content/save

/*
app.get('/api/builder/getPages', async (req, res) => {
    const pages = await PageModel.find({}).lean();
    return res.status(200).json(pages);
});

app.get('/api/builder/getPageById', async (req, res) => {
    try {
        const { id } = req.query;
        const page = await PageModel.findById(id);
        return res.status(200).json(page);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.post('/api/builder/createPage', async (req, res) => {
    try {
        const status = await PageModel.create(req.body);
        return res.status(201).json({
            status: true,
            apiResult: status
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            apiResult: err
        });
    }
});

app.post('/api/content/singleType/save', async (req, res) => {
    let { pageId, contents } = req.body;

    if (!pageId || !contents) {
        return res.status(400).json({
            status: false,
            apiResult: "bad request"
        });
    }

    try {
        const status = await PageModel.findOneAndUpdate(
            { "_id": pageId },
            { "contents": contents },
            { new: true }
        );
        return res.status(200).json({
            status: true,
            apiResult: status
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            apiResult: err
        });
    }
});

const createUpload = multerUploader.array('files');
app.post('/api/media/add', createUpload, async (req, res) => {

    const files = req.files;
    if (!files || files.length < 1) {
        return res.status(400).json({
            status: false,
            apiResult: "required files"
        });
    }

    let fileArr = [];
    for (let i = 0; i < files.length; i++) {
        fileArr.push({
            filename: files[i].filename,
            size: files[i].size,
            url: `${process.env.UPLOAD_HOST}/${files[i].filename}`
        });
        await MediaModel.create(fileArr[i]);
    }

    return res.status(201).json({
        status: true,
        files: fileArr
    });

});

app.get('/api/media', async (req, res) => {
    try {
        const list = await MediaModel.find({}).sort({ "_id" : -1 }).lean();
        return res.status(200).json({
            status: true,
            files: list
        });
    } catch (err) {
        return res.status(500).json({
            "status": false,
            "files": [],
            "err": err
        });
    }
}); */

http.listen(process.env.APP_PORT, process.env.HOST, () => {
    console.log('🚀 server running ...');
});

process.on('warning', e => {
    console.warn(e.stack);
});

module.exports = http;