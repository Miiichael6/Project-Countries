const { Router } = require("express");
const { Activity } = require("../db");

const routerActivities = Router(); // /activities

routerActivities.get("/", async (req, res) => {
  try {
    const allData = await Activity.findAll();

    return res.status(200).send(allData);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

// * POST-==================================================>
routerActivities.post("/", async (req, res) => {
  try {
    const { nombre, dificultad, duracion, temporada, countryId } = req.body;
    console.log(req.body);
    const newActivity = await Activity.create({
      nombre,
      dificultad: parseInt(dificultad),
      duracion: parseInt(duracion),
      temporada,
    });
    await newActivity.addCountries(countryId);

    return res.status(200).send(newActivity);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// !DELETEEE- ======================================================

routerActivities.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToDelete = await Activity.findByPk(id);
    await dataToDelete.destroy();
    return res.status(200).send("Eliminado correctamente");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = routerActivities;




//  PUT =====================================================>
// routerActivities.put("/update", async (req, res) => {
//   try {
//     const { id, temporada, duracion, nombre, dificultad } = req.body;
//     const dataToUpdate = await Activity.findByPk(id);
//     if (!dataToUpdate) {
//       throw {
//         error: true,
//         statusText: "Error no se encontró el Pais",
//       };
//     }
//     await dataToUpdate.update({
//       nombre,
//       dificultad,
//       temporada,
//       duracion,
//     });
//     return res.status(200).send(dataToUpdate);
//   } catch (error) {
//     if (error.statusText) return res.status(404).send(error.statusText);
//     return res.status(404).send(error.message);
//   }
// });
