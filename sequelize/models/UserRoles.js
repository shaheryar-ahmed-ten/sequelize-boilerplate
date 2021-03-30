module.exports = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define('user_roles', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        }
      }
    },{
        underscoredAll: true,
        underscored: true,
        timestamps: false,
      });
    return UserRoles;
  };