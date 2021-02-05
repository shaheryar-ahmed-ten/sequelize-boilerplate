const { DataTypes, literal } = require("sequelize");


module.exports = function (sequelize) {
    const Users = sequelize.define(
        "users",
        {
            // id: {
            //     allowNull: false,
            //     autoIncreament: true,
            //     primaryKey: true,
            //     type: DataTypes.INTEGER
            // },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            phone: {
                allowNull: true,
                unique: true,
                type: DataTypes.STRING
            },
            age: {
                type: DataTypes.INTEGER
            }
        },
        {
            // indexes:[],
            // classMethod:{

            // },

        }
    )
    return Users
}