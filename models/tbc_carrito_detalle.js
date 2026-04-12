'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1. Un detalle de carrito pertenece a un producto
      tbc_carrito_detalle.belongsTo(models.tbb_productos, {
        foreignKey: 'id_producto', // Ojo: foreignKey va con "f" minúscula
        as: 'producto'
      });

      // 2. Un detalle de carrito pertenece a un carrito
      tbc_carrito_detalle.belongsTo(models.tbb_carritos, {
        foreignKey: 'id_carrito',
        as: 'carrito'
      });
    }
  }
  
  tbc_carrito_detalle.init({
    id_carrito: DataTypes.STRING,
    id_producto: DataTypes.STRING,
    cantidad: DataTypes.STRING,
    precio_unitario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbc_carrito_detalle',
  });
  
  // ¡Ya eliminamos la basura de aquí abajo que estaba causando el error!
  
  return tbc_carrito_detalle;
};
/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
    static associate(models) {
      // define association here
    }
  }
  tbc_carrito_detalle.init({
    id_carrito: DataTypes.STRING,
    id_producto: DataTypes.STRING,
    cantidad: DataTypes.STRING,
    precio_unitario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbc_carrito_detalle',
  });
  tbb_productos.associate = (models) => {
    tbb_productos.hasMany(models.tbc_carrito_detalle, {
      ForeignKey: 'id_producto',
      as: 'tbb_productos'
    })
  };
  tbb_carritos.associate = (models) => {
    tbb_carritos.hasMany(models.tbc_carrito_detalle, {
      ForeignKey: 'id_carrito',
      as: 'tbc_carrito_detalle'
    })
  };
  return tbc_carrito_detalle;
};
*/