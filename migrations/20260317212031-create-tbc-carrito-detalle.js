'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_carrito_detalles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_carrito: {
        type: Sequelize.INTEGER,
        references:{
          model : 'tbb_carritos',
          key: 'id'
        },
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references:{
          model : 'tbb_productos',
          key: 'id'
        },
      },
      cantidad: {
        type: Sequelize.STRING
      },
      precio_unitario: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbc_carrito_detalles');
  }
};