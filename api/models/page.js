const mongoose = require('mongoose');

let schema = mongoose.Schema({
    pageTitle: String,
    pageType: String,
    controls: [],
    contents: [],
});

const Page = mongoose.model('Page', schema);
module.exports = Page;