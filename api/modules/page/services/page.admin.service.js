const mongoose = require("mongoose");
const Page = require("./../models/page");
const { ObjectId } = mongoose.Types;

class PageAdminService {

    constructor() {
        if (!!PageAdminService.instance)
            return PageAdminService.instance;

        PageAdminService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Page.create(new Page(dto));
    }

    // get all
    async getAll(pageType) {
        return await Page.find({ 'pageType': pageType })
            .sort({ _id: -1 })
            .lean();
    }

    // get by id
    async getById(params) {
        // return await Page.findById(params.id)
        /*
        return await Page
        .findOne({ _id: ObjectId(params.id) }, { _id: 1, locales: 1 })
        .lean()
        // .populate("locales.contents.components.data")
        */

        return await Page
        .findOne(
            { _id: ObjectId(params.id) },
            { _id: 1, locales: 1 })

            .populate('locales.contents.components.data', { "locales": 1 }, { "locales.name": { $regex: "fr" } })
        .lean()

    }

    // get by id
    async getByIdAndLanguage(params) {
        let { id, locale } = params;
        console.log(id, locale);
        return await Page.findOne({ "_id": id })
    }

    // add item collection
    async addItem(id, dto) {

        console.log("");
        console.log("");
        console.log(dto.contents);
        console.log("");
        console.log("");

        let data = await Page.findOne({ "_id": id });
        let localeControl = await Page.findOne({ "_id": id, "locales.name": dto?.name });

        // console.log(localeControl);
        if (localeControl) {
            return await Page.findOneAndUpdate(
                { "_id": id, "locales.name": dto?.name },
                { $push: { "locales.$[el].contents" : {...dto.contents} } },
                {
                    arrayFilters: [{ "el.name": dto?.name }],
                    new: true
                }
            );
        }

        return await Page.findOneAndUpdate(
            { "_id": id },
            { $push: { "locales": dto } },
            {
                upsert: true,
                new: true
            });

        // let locales = data?.locales;
        // let single = locales.find(w => w.name == dto?.name);
// 
        // if (!single) {
        //     locales.push(dto);
        //     console.log("locales", locales);
        //     return await Page.findOneAndUpdate(
        //         { "_id": id },
        //         { $set: { "locales": locales } },
        //         {
        //             upsert: true,
        //             new: true
        //         });
        // }
// 
        // let index = locales.indexOf(single);
        // single.contents = dto.contents;
        
        
        // return await Page.findOneAndUpdate(
        //     { _id: id },
        //     { $push: { "locales.$[el].contents" : dto.contents } },
        //     {
        //         arrayFilters: [{ "el.name": dto?.name }],
        //         upsert: true,
        //         new: true
        //     }
        // );

        /* let data = await Page.findOne({ "id": id });
        let control = data?.locales?.find(w => w.name == dto?.name);
        if (!control) {
            return await Page.findOneAndUpdate(
                { "_id": id },
                { $push: { "locales": dto } },
                {
                    upsert: true
                });
        }

        let locales = data?.locales;
        let single = locales.find(w => w.name == dto?.name);
        let index = locales.indexOf(single);

        locales[index].contents = dto.contents;
        return await Page.findOneAndUpdate(
            { "_id": id },
            { $set: { "contents": locales[index].contents } },
            {
                new: true
            }
        ); */
    }

    // save page content
    async contentSave(pageId, body) {
        let name = body.name; // tr
        let data = await Page.findOne({ "id": pageId });
        let control = data?.locales?.find(w => w.name == name);
        if (!control) {
            return await Page.findOneAndUpdate(
                { "_id": pageId },
                { $push: { "locales": body } },
                {
                    new: true,
                    upsert: true
                });
        }

        let locales = data?.locales;
        let single = locales.find(w => w.name == name);
        let index = locales.indexOf(single);
        locales[index].contents = body.contents;
        return await Page.findOneAndUpdate(
            { "_id": pageId },
            { $set: { "locales": locales } },
            {
                new: true
            }
        );
    }

    // update one
    async findOneAndUpdate(dto) {
        return await Page.findOneAndUpdate(
            { "_id": dto?._id },
            { $set: dto },
            { new: true }
        );
    }

    // delete
    async delete(id) {
        return await Page.deleteOne({ _id: id });
    }

}

module.exports = PageAdminService;