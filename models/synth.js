'use strict';
module.exports = (sequelize, DataTypes) => {
  var Synth = sequelize.define('Synth', {
    name: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Synth.associate = function(models) {
    // associations can be defined here
  };
  return Synth;
};