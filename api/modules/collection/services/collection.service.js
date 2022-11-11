const mongoose = require("mongoose");
const Collection = require("./../models/collection");

class CollectionService {

    constructor() {
        if (!!CollectionService.instance)
            return CollectionService.instance;

        CollectionService.instance = this;
        return this;
    }

    // create
    async create(dto) {
        return await Collection.create(new Collection(dto));
    }

    // get all
    async getAll(pagination) {
        return await Collection.find({})
        .sort({ _id: -1 })
        .limit(pagination.limit)
        .skip(pagination.limit * (pagination.page - 1))
        .lean();
    }

    // get by id
    async getById(id) {
        return await Collection.findById(id)
    }

    // get by company name
    async getByCompanyName(name) {
        return await Collection.findOne({ name: name });
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

module.exports = CollectionService;