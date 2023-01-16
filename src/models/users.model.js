const { DataTypes } = require("sequelize");

module.exports = model;
function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    nickname: { type: DataTypes.STRING, allowNull: false },
    mail: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    sex: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    // Desabilitar timestampo por defecto
    timestamps: true,
  };
  return sequelize.define("users", attributes, options);
}
module.exports = model;
