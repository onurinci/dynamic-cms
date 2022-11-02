const mongoose = require('mongoose');

let schema = mongoose.Schema({
    filename: String,
    size: Number,
    url: String
});

const Media = mongoose.model('Media', schema);
module.exports = Media;