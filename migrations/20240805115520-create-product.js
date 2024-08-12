'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,DataTypes) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:DataTypes.INTEGER
      },
      uuid: {
        defaultValue:DataTypes.UUIDV4,
        type:DataTypes.UUID
      },
      name: {
        allowNull: false,
        type:DataTypes.STRING
      },
      description: {
        allowNull: false,
        type:DataTypes.STRING
      },
      price: {
        allowNull: false,
        type:DataTypes.FLOAT
      },
      image: {
        allowNull: false,
        type:DataTypes.STRING
      },
      ratings: {
        allowNull: true,
        type:DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type:DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type:DataTypes.DATE
      }
    });
  },
  async down(queryInterface,DataTypes) {
    await queryInterface.dropTable('Products');
  }
};