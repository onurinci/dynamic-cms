const mongoose = require("mongoose");
const Page = require("./../models/page");

class PageService {

    constructor() {
        if (!!PageService.instance)
            return PageService.instance;

        PageService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Page.create(new Page(dto));
    }

    // get all
    async getAll(pagination) {
        return await Page.find({})
        .sort({ _id: -1 })
        .limit(pagination.limit)
        .skip(pagination.limit * (pagination.page - 1))
        .lean();
    }

    // get by id
    async getById(id) {
        return await Page.findById(id)
    }

    // get by company name
    async getByCompanyName(name) {
        return await Page.findOne({ name: name });
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

module.exports = PageService;