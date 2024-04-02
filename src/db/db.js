const { Sequelize, Op} = require('sequelize');

const modelComunication = require('./model/comunication'); // Modelo de comunicacion
const modelSubscripion = require('./model/subscription'); // Modelo de comunicacion

const entorno = true;

const dburl = entorno ? 'postgresql://postgres:PdmmIKhoWvQuRgjqsAsLIQzNLYOOEqzs@postgres:5432/railway' : 'postgres:postgres:123@localhost:5432/noah'

const sequelize = new Sequelize(dburl, {
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