const { InternationalizationService } = require('./../services')

const service = new InternationalizationService();

const create = async (req, res, next) => {
    const created = await service.create(req.body);
    return res.status(201).json(created);
};

const getAll = async (req, res, next) => {
    const data = await service.getAll();
    return res.status(200).json(data);
};

module.exports = {
    create,
    getAll
};