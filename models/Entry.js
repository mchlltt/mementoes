var Sequelize = require('sequelize');

// Model for tracking transactions
module.exports = function (sequelize, DataTypes) {
    var Entry = sequelize.define('Entry', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
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
    }, {
        classMethods: {
            associate: function(models) {
                Entry.belongsTo(models.User, {foreignKey: 'googleId', onDelete: 'CASCADE'});
            }
        }
    });
    return Entry;
};