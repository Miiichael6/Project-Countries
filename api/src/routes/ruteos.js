const { Router } = require("express");

const router = Router();

const routerActivities = require("./activities.js");
const routerCountries = require("./index.js");

router.use("/countries", routerCountries);
router.use("/activities", routerActivities);

module.exports = router