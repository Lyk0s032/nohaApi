const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('comunication', { 
        // Nombre
        nameUser: {
            type: DataTypes.STRING
        },
        // Numero de contacto
        phoneUser: {
            type: DataTypes.STRING
        },
        // Ubication
        userCase: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        }

    })
}   