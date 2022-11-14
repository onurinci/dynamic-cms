const { InternationalizationAdminService } = require('./../services')

const service = new InternationalizationAdminService();

const create = async (req, res, next) => {
    if(req.body.isDefault){
        await service.updateAll({isDefault : false})
    }
    const created = await service.create(req.body);
    return res.status(201).json(created);
};

const getAll = async (req, res, next) => {
    const data = await service.getAll();
    return res.status(200).json(data);
};

const setDefaultLang = async (req,res,next) => {
    const data = {
        _id: req.body.id,
        isDefault: true
    }
    await service.updateAll({isDefault : false});
    const response = await service.findOneAndUpdate(data)
    return res.status(200).json(response);
}

module.exports = {
    create,
    getAll,
    setDefaultLang
};
