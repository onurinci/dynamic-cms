const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateUUID = () => {
    return uuid.v4();
}

const generateFilename = (originalFilename) => {
    return generateUUID() + path.extname(originalFilename);
}

const arrayItemTrim = (arr) => {
    if (!arr) return [];
    for (let i = 0; i < arr.length; i++)
        arr[i] = arr[i].trim();
    return arr;
}

const passwordHashAsync = async (value) => {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(value, salt);
};

const passwordHashCompareAsync = async (value, hash) => {
    return await bcrypt.compare(value, hash);
};

const createJwtToken = (payload, key, expiresIn) => {
    try {
        return jwt.sign(payload, key, { expiresIn: expiresIn });
    } catch (err) {
        console.log("jwt token create error", err);
    }
};

const getJwtDecoded = (requestHeaders, hash) => {
    try {
        const header = requestHeaders['authorization'];
        if (!header)
            return res.status(401).send();

        const token = header.split(' ')[1];
        if (!token)
            return res.status(401).send();

        return jwt.verify(token, hash);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateUUID,
    generateFilename,
    arrayItemTrim,
    passwordHashAsync,
    createJwtToken,
    getJwtDecoded,
    passwordHashCompareAsync
};