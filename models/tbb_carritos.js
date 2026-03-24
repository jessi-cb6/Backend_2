'use strict';
const {
  Model,
  ForeignKeyConstraintError
} = require('sequelize');
const tbc_usuarios = require('./tbc_usuarios');
const tbc_carrito_detalle = require('./tbc_carrito_detalle');
module.exports = (sequelize, DataTypes) => {
  class tbb_carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_carritos.init({
    id_usuario: DataTypes.STRING,
    fecha_creacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbb_carritos',
  });
  tbb_carritos.associate = (models) => {
    tbb_carritos.hasMany(models.tbc_usuarios, {
      ForeignKey: 'id_usuario',
      as: 'tbc_usuarios'
    })
  };
  tbc_carrito_detalle.associate = (models) => {
    tbc_carrito_detalle.hasMany(models.tbb_carritos, {
      ForeignKey: 'id_carrito',
      as: 'tbc_carritos_detalle'
    })
  }
/*
  tbc_usuarios.associate = (models) => {
    tbc_usuarios.hasMany(models.tbb_carritos, {
      ForeignKey: 'id_usuario',
      as: 'tbb_carritos'
    })
  }
*/
  return tbb_carritos;
};