const { Router } = require("express");
const { Country, Activity } = require("../db");
const GET_ALL_DATA = require("../GET_ALL_DATA");
// Importar todos los routerCountriess;
// Ejemplo: const authrouterCountries = require('./auth.js');
const routerCountries = Router(); // ? /countries

// ? ********************Manejo de Rutas|| COUNTRY *********************

routerCountries.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let data = await Country.count();
    if (data < 1) await GET_ALL_DATA();
    const allData = await Country.findAll({ include: Activity });

    if (!name) {
      return res.status(200).send(allData);
    } else {
      const minus = name.replace(/%20/g, " ");
      const country = allData.filter(
        (i) =>
          i.nombre.toLowerCase().includes(minus.toLowerCase()) ||
          i.nombre_spa.toLowerCase().includes(minus.toLowerCase())
      );
      if (country.length !== 250) return res.status(200).send(country);

      throw {
        error: true,
        statusText: `no se encontró el Pais con el nombre: ${name}`,
      };
    }
  } catch (err) {
    if (err.statusText) return res.status(404).json(err);
    return res.status(404).send(err.message);
  }
});

routerCountries.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tUC = id.toLowerCase();
    const data = await Country.count();
    if (data < 1) await GET_ALL_DATA();

    const searchByID = await Country.findAll({
      where: {
        id: tUC,
      },
      include: Activity,
    });
    if (searchByID.activities < 0) {
      await searchByID[0].update();
    }

    if (!searchByID) {
      throw {
        error: 404,
        statusText: `ruta de ID: =>${id}<= no encontrada. recuerde que el ID contiene solamente 3 letras`,
      };
    }

    return res.status(200).send(searchByID);
  } catch (error) {
    if (error.statusText) return res.status(404).send(error);
    return res.status(404).send(error.message);
  }
});

module.exports = routerCountries;
