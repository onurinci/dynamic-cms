const mongoose = require("mongoose");
const Internationalization = require("../models/internationalization");

class InternationalizationService {

    constructor() {
        if (!!InternationalizationService.instance)
            return InternationalizationService.instance;

        InternationalizationService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Internationalization.create(new Internationalization(dto));
    }

    // get all
    async getAll() {
        return await Internationalization.find({})
        .sort({ _id: -1 })
        .lean();
    }

    // get by id
    async getById(id) {
        return await Internationalization.findById(id)
    }

    // update one
    async findOneAndUpdate(dto) {
        return await Internationalization.findOneAndUpdate(
            { "_id": dto?._id },
            { $set: dto },
            { new: true }
        );
    }

    // delete
    async delete(id) {
        return await Internationalization.deleteOne({ _id: id });
    }

}

module.exports = InternationalizationService;