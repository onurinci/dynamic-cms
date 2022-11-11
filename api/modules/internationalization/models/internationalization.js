const mongoose = require('mongoose');

let schema = mongoose.Schema({
    locale: String,
    name: String,
    isDefault: Boolean
});

const Internationalization = mongoose.model('Internationalization', schema);
module.exports = Internationalization;