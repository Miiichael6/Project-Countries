const { DataTypes } = require("sequelize");

// ! no olvidar mostrar las Relaciones y la tabla intermediaa

const Activity = (sequelize) => {
  sequelize.define(
    "activity",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.INTEGER, // * horas
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
