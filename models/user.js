'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product);
    }
  }
  User.init({
    uuid: {
      defaultValue:DataTypes.UUIDV4,
      type:DataTypes.UUID
    },
    name: {
      allowNull: false,
      type:DataTypes.STRING
    },
    phone: {
      allowNull: false,
      unique:true,
      type:DataTypes.STRING
    },
    roles: {
      allowNull: false,
      defaultValue:"user",
      type:DataTypes.ENUM("admin","user","saler")
    },
    password: {
      allowNull: false,
      type:DataTypes.STRING
    },
  }, {
    defaultScope:{
      attributes: {
        exclude: ['id', 'updatedAt'],
      }
    },
    scopes: {
      withUserId: {
        attributes: {
          include: ['id'],
        },
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};