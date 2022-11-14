const mongoose = require("mongoose");
const Internationalization = require("./../models/internationalization");

class InternationalizationAdminService {

    constructor() {
        if (!!InternationalizationAdminService.instance)
            return InternationalizationAdminService.instance;

            InternationalizationAdminService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Internationalization.create(new Internationalization(dto));
    }

    // get all
    async getAll() {
        return await Internationalization.find()
        .sort({ isDefault: -1 })
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

    // update all
    async updateAll(args){
        return await Internationalization.updateMany(
            {},
            { $set : args }
        );
    }

    // delete
    async delete(id) {
        return await Internationalization.deleteOne({ _id: id });
    }

}

module.exports = InternationalizationAdminService;
