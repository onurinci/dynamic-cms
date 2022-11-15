const mongoose = require('mongoose');
const db = mongoose.connection;

db.once("open", () => { });
const connect = () => {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        if (process.env.NODE_ENV != 'test') {
            console.log('db connected...');
        }
    })
    .catch((err) => {
        console.log(`Error connection database: ${err}`);
        return;
    });
}

const disconnect = () => {
    mongoose.disconnect().then(resp => {
        console.log('db disconnected...');
    });
}

module.exports = {
    connect,
    disconnect
};
