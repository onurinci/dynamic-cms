var express = require('express');
var app = express();
const http = require("http").createServer(app);
var cors = require('cors');
const helmet = require("helmet");
const dotenv = require("dotenv");
const PageModel = require("./models/pages");
const { ObjectId } = require("mongoose").Types;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

dotenv.config();
const db = require("./config/database");
db.connect();

app.get('/healtCheck', async (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

app.get('/api/builder/getPages', async (req, res) => {
    const pages = await PageModel.find({});
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

http.listen(process.env.APP_PORT, process.env.HOST, () => {
    console.log('🚀 server running ...');
});

process.on('warning', e => {
    console.warn(e.stack);
});

module.exports = http;