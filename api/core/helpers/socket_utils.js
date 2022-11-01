const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getHeaders = (socket) => {
    return socket.handshake.query;
};

const getCustomerHeaders = (socket) => {
    return socket.handshake.headers;
};

const getJwtSocketDecoded = (socket) => {
    try {
        const header = socket.handshake.query?.authorization;
        if (!header)
            return res.status(401).send();

        const token = header.split(' ')[1];
        if (!token)
            return res.status(401).send();

        return jwt.verify(token, process.env.JWT_SCRET_KEY);
    } catch (error) {
        return null;
    }
};

const getCustomerJwtSocketDecoded = (socket) => {
    try {
        const header = socket.handshake.headers?.authorization;
        if (!header)
            return res.status(401).send();

        const token = header.split(' ')[1];
        if (!token)
            return res.status(401).send();

        return jwt.verify(token, process.env.JWT_SCRET_KEY);
    } catch (error) {
        return null;
    }
};

const getConnectedUsersByRoom = (roomName) => {
    const rooms = console.log(io.sockets.adapter.rooms);
    console.log("rooms");
    console.log(rooms);
    const users = rooms.filter(e => e.roomName == room);
    return users;
};

module.exports = {
    getHeaders,
    getCustomerHeaders,
    getJwtSocketDecoded,
    getCustomerJwtSocketDecoded,
    getConnectedUsersByRoom
};