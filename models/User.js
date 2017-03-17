var Sequelize = require('sequelize');

// Model for tracking transactions
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        googleId: {
            type: DataTypes.STRING,
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
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Entry, {foreignKey: 'googleId', allowNull: false});
            }
        }
    });
    return User;
};