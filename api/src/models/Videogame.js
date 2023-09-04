const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    released:{
     type:DataTypes.DATE,
     allowNull:true,
    },
    rating:{
     type:DataTypes.INTEGER,
     allowNull:true,
    },
    CreatedInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    timestamps: false
  });
};
