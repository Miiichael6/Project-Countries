const { DataTypes } = require("sequelize");

const Activity = (sequelize) => {
  sequelize.define(
    "activity",
    {
      nombre: {
        type: DataTypes.STRING,
      },
      dificultad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duracion: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      temporada: {
        type: DataTypes.ENUM("Verano", "Otonio", "Invierno", "Primavera"),
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Activity;
