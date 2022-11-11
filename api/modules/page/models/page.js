const mongoose = require('mongoose');
// const Collection = require("./../../collection/models/collection");

let schema = mongoose.Schema({
    pageTitle: String,
    pageType: String,
    controls: [],
    locales: [
        {
            name: String,
            contents: [
                {
                    name: String,
                    value: String | [],
                    components: {
                        setting: {
                            listCount: { type: Number, default: 10 }
                        },
                        data: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Collection',
                            // default: "636b8e8e59da1ba49571f805"
                        },
                    } 
                }
            ]
        }
    ],
});

const Page = mongoose.model('Page', schema);
module.exports = Page;