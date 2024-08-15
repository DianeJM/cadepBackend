'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,DataTypes) {
    await queryInterface.createTable('Users', {
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
      phone: {
        allowNull: false,
        unique:true,
        type:DataTypes.STRING
      },
      email: {
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
    await queryInterface.dropTable('Users');
  }
};