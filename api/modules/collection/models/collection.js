const mongoose = require('mongoose');

let schema = mongoose.Schema({
    pageTitle: String,
    pageType: String,
    controls: [],
    locales: [
        {
            name: String,
            contents: [
                {
                    data: [

                    ]
                },
            ]
        }
    ],
});

const Collection = mongoose.model('Collection', schema);
module.exports = Collection