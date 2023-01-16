const { DataTypes } = require("sequelize");

module.exports = model;
function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    imageSearch: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: true },
  };
  const options = {
    // Desabilitar timestampo por defecto
    timestamps: false,
  };
  return sequelize.define("tournaments", attributes, options);
}
module.exports = model;
