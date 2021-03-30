module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('roles', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },
        deleted_at: {
            type: DataTypes.DATE
        }
    }, {
        underscoredAll: true,
        underscored: true,
        timestamps: false,
    });
    Roles.associate = (models) => {
        Roles.belongsToMany(models.users, {
            through: 'user_roles',
            as: 'users',
            foreignKey: 'role_id'
        });
    };
    return Roles;
};