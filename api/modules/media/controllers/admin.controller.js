const { MediaAdminService } = require('./../services')

const service = new MediaAdminService();

const create = async (req, res, next) => {
    const files = req.files;
    if (!files || files.length < 1) {
        return res.status(400).json({
            status: false,
            apiResult: "required files"
        });
    }

    for (let i = 0; i < files.length; i++) {
        await service.create({
            filename: files[i].filename,
            size: files[i].size,
            url: `${process.env.UPLOAD_HOST}/${files[i].filename}`
        });
    }

    return res.status(201).json({
        "status": true
    });
};

const getAll = async (req, res, next) => {
    const data = await service.getAll();
    return res.status(200).json(data);
};

module.exports = {
    create,
    getAll
};