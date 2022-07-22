const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const games = require("./games.js");
const genre = require("./genre.js");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", games);
router.use("/genres", genre);

module.exports = router;
