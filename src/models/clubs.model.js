const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    clubName: { type: DataTypes.STRING, allowNull: true },
    imageSearch: { type: DataTypes.BLOB("long"), allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    // Desabilitar timestampo por defecto
    timestamps: false,
  };
  return sequelize.define("users", attributes, options);
}
module.exports = model;
