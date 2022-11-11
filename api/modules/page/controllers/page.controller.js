const { PageService } = require('./../services')

const service = new PageService();

const create = async (req, res, next) => {
    const created = await service.create(req.body);
    return res.status(201).json(created);
};

const getAll = async (req, res, next) => {
    const pagination = {
        page : req.query?.page || 1,
        limit: req.query?.limit || 10
    };
    const data = await service.getAll(pagination);
    return res.status(200).json(data);
};

module.exports = {
    create,
    getAll
};