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

// get by id
const getById = async (req, res, next) => {
    const data = await service.getById(req?.params);
}

const deleteMany = async (req, res, next) => {
    console.log(req.body);
    let arr = req.body;
    if (!arr) {
        return res.status(400).json();
    }

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        const media = await service.getByFilename(arr[i]);
        console.log(media);
        const data = await service.delete(media?._id);
    }

    // const data = await service.deleteMany(arr);
    return res.status(200).json({ status : "ok" });
}

module.exports = {
    create,
    getAll,
    getById,
    deleteMany
};