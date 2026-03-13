'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_usuarios'), {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
nombre:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    direccion: DataTypes.STRING(150),
    password: DataTypes.STRING(225),
    email: DataTypes.STRING(120),
    telefono: DataTypes.STRING(15),
    rol:{
      type: DataTypes.ENUM('admin','cliente'),
      allowNull:false,
      defaultValue: 'cliente'
    },
    fecha_registro: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tbc_usuarios',
  };
  return tbc_usuarios;
}
    }