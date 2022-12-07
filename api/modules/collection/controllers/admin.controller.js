const { CollectionAdminService } = require('./../services')

const service = new CollectionAdminService();

// create
const create = async (req, res, next) => {
    const created = await service.create(req.body);
    return res.status(201).json(created);
};

// get all
const getAll = async (req, res, next) => {

    const { pageType } = req?.query;
    if (!pageType)
        return res.status(400).json({"error": "pageType required"});

    const data = await service.getAll(pageType);
    return res.status(200).json(data);
};

// get by id
const getById = async (req, res, next) => {

    const { id, locale } = req?.params;
    if (!id)
        return res.status(400).json({"error": "id required"});

    if (!locale)
        return res.status(400).json({"error": "locale required"});

    const data = await service.getById(req?.params);
    const localeData = data?.locales.find(w => w.name == locale);

    const newData = {
        _id: data?._id,
        pageTitle: data?.pageTitle,
        pageType: data?.pageType,
        controls: data?.controls,
        contents: localeData?.contents || [],
    };
    return res.status(200).json(newData);
}

const getEntryDetails = async (req, res, next) => {
    const data = {
        id: req.params.id,
        name: req.params.locale,
        entryId: req.params.entryId
    }

    const response = await service.getEntryDetails(data);
    return res.status(200).json(response);
}

// content save
const contentSave = async (req, res, next) => {
    let { id } = req.params;
    let { contents } = req.body;

    if (!id)
        return res.status(400).json({"error": "id required"});

    if (!contents)
        return res.status(400).json({"error": "contents required"});

    try {
        const response = await service.contentSave(id, req.body);
        return res.status(200).json({
            "success": true,
            "result": response
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "success": false,
            "result": err
        });
    }
};

// add new collection
const addItem = async (req, res, next) => {

    let { id } = req?.params;
    let { name, data } = req?.body;

    try {
        const created = await service.addItem(id, {
            name: name,
            contents: {
                data
            }
        });
        return res.status(201).json(created);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const update = async (req, res, next) => {

    let { id } = req?.params;
    let { name, entryId, data } = req?.body;

    try {
        const created = await service.update(id, entryId, {
            name: name,
            contents: {
                ...data
            }
        });
        return res.status(201).json(created);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    contentSave,
    addItem,
    update,
    getEntryDetails
};
