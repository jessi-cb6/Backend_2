'use strict';
const {
  Model
} = require('sequelize');
const tbc_carrito_detalle = require('./tbc_carrito_detalle');
module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_productos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.STRING,
    stock: DataTypes.STRING,
    id_categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });
  tbb_productos.associate = (models) => {
    tbb_productos.hasMany(models.tbc_categorias, {
      ForeignKey: 'id_categoria',
      as: 'tbc_categorias'
    })
  }
  tbc_carrito_detalle.associate = (models) => {
    tbc_carrito_detalle.hasMany(models.tbb_productos, {
      ForeignKey: 'id_productos',
      as: 'tbb_productos'
    })
  }
  return tbb_productos;
};