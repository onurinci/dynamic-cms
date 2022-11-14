const { PageAdminService } = require('./../services')

const service = new PageAdminService();

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
    const localeData = data?.locales?.find(w => w.name == locale);
    const newData = {
        _id: data?._id,
        pageTitle: data?.pageTitle,
        pageType: data?.pageType,
        controls: data?.controls,
        contents: localeData?.contents || [],
    };
    return res.status(200).json(newData);
}

// get by id
const getByOnlyId = async (req, res, next) => {

    const { id } = req?.params;
    if (!id)
        return res.status(400).json({"error": "id required"});

    const data = await service.getById(req?.params);
    const newData = {
        _id: data?._id,
        pageTitle: data?.pageTitle,
        controls: data?.controls
    };
    return res.status(200).json(newData);
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
    let { name, item } = req?.body;

    try {
        const created = await service.addItem(id, {
            name: name,
            contents: {
                ...item
            }
        });
        return res.status(201).json(created);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// create control
const createControl = async (req, res, next) => {

    let { id } = req?.params;
    const body = req?.body;

    console.log("id = ", id);
    console.log("body = ", body);

    if (!id)
        return res.status(400).json({ message: "required id" });

    if (!body)
        return res.status(400).json({ message: "required body" });

    try {
        const response = service.createControl(id, body);
        return res.status(201).json(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// delete control
const deleteBuilderControl = async (req, res, next) => {

    let { pageId, controlId } = req?.body;
    if (!pageId)
        return res.status(400).json({ "error message": "pageId required" });

    if (!controlId)
        return res.status(400).json({ "error message": "controlId required" });

    try {
        const result = await service.deleteBuilderControl(req?.body);
        return res.status(200).json({ status: "deleted" });
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    getByOnlyId,
    contentSave,
    deleteBuilderControl,
    addItem,
    createControl
};