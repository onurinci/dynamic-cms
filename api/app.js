var express = require('express');
var app = express();
const http = require("http").createServer(app);
var cors = require('cors');
const helmet = require("helmet");
const dotenv = require("dotenv");
const PageModel = require("./models/pages");

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

app.post('/createPage', async (req, res) => {
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

http.listen(process.env.APP_PORT, process.env.HOST, () => {
    console.log('🚀 server running ...');
});

process.on('warning', e => {
    console.warn(e.stack);
});

module.exports = http;