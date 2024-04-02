const { Sequelize, Op} = require('sequelize');

const modelComunication = require('./model/comunication'); // Modelo de comunicacion
const modelSubscripion = require('./model/subscription'); // Modelo de comunicacion



const sequelize = new Sequelize('postgres:postgres:123@localhost:5432/noah', {
    logging: false,
    native: false,
});

modelComunication(sequelize);
modelSubscripion(sequelize);

const { comunication, subscription } = sequelize.models;

// Exportamos.

module.exports = {
    ...sequelize.models,
    db: sequelize,
    Op
}   