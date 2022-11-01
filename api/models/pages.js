const mongoose = require('mongoose');

let schema = mongoose.Schema({
    pageTitle: String,
    controls: []
});

const Page = mongoose.model('Page', schema);
module.exports = Page;