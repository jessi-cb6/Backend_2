'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_categorias extends Model {
    static associate(models) {
      // Una categoría TIENE MUCHOS productos
      tbc_categorias.hasMany(models.tbb_productos, {
        foreignKey: 'id_categoria', // F minúscula
        as: 'productos'
      });
    }
  }
  tbc_categorias.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbc_categorias',
  });
  
  return tbc_categorias;
};
/*
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
    static associate(models) {
      // define association here
    }
  }
  tbc_categorias.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbc_categorias',
  });
  tbc_categorias.associate = (models) => {
    tbc_categorias.hasMany(models.tbb_productos, {
      ForeignKey: 'id_categoria',
      as: 'tbb_productos'
    })
  }
  return tbc_categorias;
};
*/