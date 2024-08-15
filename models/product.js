"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
    }
  }
  Product.init(
    {
      uuid: {
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ratings: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["id"],
        },
      },
      scopes: {
        validImages: {
          where: {
            image: { [Op.like]: "%%" },
          },
        },
      },
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
