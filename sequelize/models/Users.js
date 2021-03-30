const { DataTypes, literal } = require("sequelize");

module.exports = function (sequelize) {
    const Users = sequelize.define(
        "users",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            fullName: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "fullName cannot be empty" },
                },
            },
            mobile: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notEmpty: { msg: "mobile cannot be empty" },
                },
            },
            email: {
                allowNull: true,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notEmpty: { msg: "email cannot be empty" },
                    isEmail: { args: true, msg: "Please provide a valid email format" },
                },
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                get() {
                    return "********";
                },
                validate: {
                    notEmpty: { msg: "password cannot be empty" },
                    // isEmail: { args: true, msg: "Please provide a valid email format" },
                },
            },
            resetToken: {
                type: DataTypes.STRING
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            // indexes  : [],
            // classMethods: {
            //     associate: function (models) {
            //         Users.belongsToMany(models.roles, {
            //             through: "user_roles",
            //             foreignKey: "user_id",
            //             as: "roles",
            //         });
            //         Users.hasMany(models.user_carts, {
            //             foreignKey: { name: "userId", allowNull: false },
            //             as: "user_carts"
            //         });
            //         Users.hasMany(models.orders, {
            //             foreignKey: { name: "userId", allowNull: false },
            //             as: "userOrders"
            //         });
            //         Users.hasMany(models.orders, {
            //             foreignKey: { name: "acceptedBy", allowNull: true },
            //             as: "acceptedOrders"
            //         });
            //     },
            // },

            // underscoredAll: true,
            // underscored: true,
            timestamps: true,
        });
    Users.associate = (models) => {
        Users.belongsToMany(models.roles, {
            through: 'user_roles',
            as: 'roles',
            foreignKey: 'user_id'
        });
    };
    return Users;
};
