const mongoose = require("mongoose");
const Collection = require("./../models/collection");

class CollectionAdminService {

    constructor() {
        if (!!CollectionAdminService.instance)
            return CollectionAdminService.instance;

        CollectionAdminService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Collection.create(new Collection(dto));
    }

    // get all
    async getAll(pageType) {
        return await Collection.find({ 'pageType': pageType })
            .sort({ _id: -1 })
            .lean();
    }

    // get by id
    async getById(params) {
        return await Collection.findById(params.id)
    }

    // get by id
    async getByIdAndLanguage(params) {
        let { id, locale } = params;
        console.log(id, locale);
        return await Collection.findOne({ "_id": id })
    }

    async getEntryDetails(dto) {
        const response = await Collection.findOne({ '_id': mongoose.Types.ObjectId(dto.id), 'locales.name': dto.name });
        const contents = response.locales[0].contents.find(f => f._id == dto.entryId)?.data;
        const controls = response.controls;

        return {
            contents,
            controls
        }
    }

    // add item collection
    async addItem(id, dto) {
        let localeControl = await Collection.findOne({ "_id": id, "locales.name": dto?.name });
        if (localeControl) {
            return await Collection.findOneAndUpdate(
                { "_id": id, "locales.name": dto?.name },
                { $push: { "locales.$[el].contents": { ...dto.contents } } },
                {
                    arrayFilters: [{ "el.name": dto?.name }],
                    new: true
                }
            );
        }

        return await Collection.findOneAndUpdate(
            { "_id": id },
            { $push: { "locales": dto } },
            {
                upsert: true,
                new: true
            });
    }

    // update
    async update(id, entryId, dto) {

        console.log(id);
        console.log(entryId);
        console.log(dto);

        // let localeControl = await Collection.findOne({ "_id": id, "locales.name": dto?.name });
        // if (!localeControl) {
        //     return null;
        // }

        // db.collection.updateOne({_id: "611ed1a7e81cf2e4879a73f8"}, {$pull: {rooms: {_id: "611efbb06986120738b4092f"}}})
        /*
        db.survey.update( // select your doc in moongo
            { }, // your query, usually match by _id
            { $pull: { results: { $elemMatch: { score: 8 , item: "B" } } } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        )
        */

        try {
            // contents: { _id: entryId }
            // const data = await Collection.updateOne({ "_id": id }, { $pull: { locales: { name: dto.name, contents: { _id: entryId } } }});

            const data = await Collection.updateOne(
                { '_id': id, 'locales.contents._id': mongoose.Types.ObjectId(entryId) },
                { $pull: { 'locales.$.contents': { _id: mongoose.Types.ObjectId(entryId) } } }
            );
            return data;

            // const abc = await Collection.findOneAndDelete(entryId);
            // console.log("abc => ", abc);

            /*return await Page.updateOne(
                { '_id': pageId },
                { $pull: { 'controls': { _id: controlId } } });

            console.log("entry", data);
            */
        } catch (error) {
            console.log("error", error);
        }

        // return await Page.updateOne(
        //     { '_id': id },
        //     { $pull: { "locales.name": dto?.name, 'locales.name': { _id: controlId } } });

        // return await Collection.findOneAndUpdate(
        //     { "_id": id, "locales.name": dto?.name },
        //     { $push: { "locales.$[el].contents": { ...dto.contents } } },
        //     {
        //         arrayFilters: [{ "el.name": dto?.name }],
        //         new: true
        //     }
        // );

    }

    // save page content
    async contentSave(pageId, body) {
        let name = body.name; // tr
        let data = await Collection.findOne({ "id": pageId });
        let control = data?.locales?.find(w => w.name == name);
        if (!control) {
            return await Collection.findOneAndUpdate(
                { "_id": pageId },
                { $push: { "locales": body } },
                {
                    upsert: true
                });
        }

        let locales = data?.locales;
        let single = locales.find(w => w.name == name);
        let index = locales.indexOf(single);
        locales[index].contents = body.contents;
        return await Collection.findOneAndUpdate(
            { "_id": pageId },
            { $set: { "locales": locales } },
            {
                new: true
            }
        );
    }

    // update one
    async findOneAndUpdate(dto) {
        return await Collection.findOneAndUpdate(
            { "_id": dto?._id },
            { $set: dto },
            { new: true }
        );
    }

    // delete
    async delete(id) {
        return await Collection.deleteOne({ _id: id });
    }

}

module.exports = CollectionAdminService;
