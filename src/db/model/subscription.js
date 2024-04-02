const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('subscription', { 
        // Email
        email: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        }

    })
}   