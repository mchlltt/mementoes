var Sequelize = require('sequelize');

// Model for tracking transactions
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        googleId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    });
    return User;
};