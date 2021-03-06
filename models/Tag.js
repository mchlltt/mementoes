// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing tags.
module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
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
                Tag.belongsToMany(models.Entry, {through: 'EntryTag', as: 'tagHasEntries', foreignKey: 'tagId'});
            }
        }
    });
    return Tag;
};