const mongoose = require("mongoose");
const Media = require("./../models/media");

class MediaAdminService {

    constructor() {
        if (!!MediaAdminService.instance)
            return MediaAdminService.instance;

            MediaAdminService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Media.create(new Media(dto));
    }

    // get all
    async getAll() {
        return await Media.find()
        .sort({ _id: -1 })
        .lean();
    }

    // get by id
    async getById(id) {
        return await Media.findById(id)
    }

    // update one
    async findOneAndUpdate(dto) {
        return await Media.findOneAndUpdate(
            { "_id": dto?._id },
            { $set: dto },
            { new: true }
        );
    }

    // delete
    async delete(id) {
        return await Media.deleteOne({ _id: id });
    }

}

module.exports = MediaAdminService;