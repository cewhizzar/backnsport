const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    tournament: { type: DataTypes.STRING, allowNull: false },
    game: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    // Desabilitar timestampo por defecto
    timestamps: false,
  };
  return sequelize.define("matches", attributes, options);
}
module.exports = model;
