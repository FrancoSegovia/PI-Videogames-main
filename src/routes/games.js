const { Router } = require('express');
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame } = require("../db");
const { Genre } = require("../db");


const router = Router();
router.use(express.json());
const cors = require("cors");


//!                                                      
//! -- Si incluye un query del tipo search, busca el juego aproximado por su nombre. Sino trae todos los juegos. --


router.get("/", async (req, res, next) => {
    const { search } = req.query;

    if (search) {
        try {                       //! SEARCH QUERY
            let searchPreparado = search;

            if (search.includes("%20")) {       //! Verifico si el search está separado por "%20".
                searchPreparado = search.split("%20").join(" ");
            } else if (search.includes("-")) {  //! Verifico si el search está separado por "-".
                searchPreparado = search.split("-").join(" ");
            }


            const url = await axios.get(`https://api.rawg.io/api/games?search=${searchPreparado}&key=${API_KEY}`);
            const arrayJuegosBuscados = url.data.results; 

            const apiVideogames = arrayJuegosBuscados.map(vgame => { 
                return {                                             
                    id:vgame.id,                                    
                    image:vgame.background_image,
                    name:vgame.name,
                    rating:vgame.rating,
                    genres:vgame.genres.map(genre => genre.name)
                }
            })

            const juegosDB = await Videogame.findAll({               
                include:Genre                                     
            });                    
            const dbVideogames = juegosDB.map(dbGame => {            
                return {                                             
                    id:dbGame.id,                                    
                    name:dbGame.name,
                    rating:dbGame.rating,
                    genres:dbGame.genres.map(genre => genre.name)
                }
            })
                                                                 
            const infoJunta = [...dbVideogames, ...apiVideogames];
            const infoFiltrada = infoJunta.filter(juego => juego.name.toLowerCase().includes(searchPreparado));
      

            if (!infoFiltrada.length) res.send(`No hay juegos con ese nombre...`); 
            else res.send(infoFiltrada.slice(0,15)); 
        } 
        catch (error) {
            next(error);
        }
    } else {        //!         GET GAMES
        try {

            //!-----CONSULTA A MI BASE DE DATOS Y SU RESPONSE---------
            const findDBVideogames = await Videogame.findAll({
                include:Genre
            });
            const dbVideogames = findDBVideogames.map(dbGame => {
                return {
                    id:dbGame.id,
                    name:dbGame.name,
                    genres:dbGame.genres.map(genre => genre.name),
                    rating:dbGame.rating,
                    platforms:dbGame.platforms
                }
            })
            //!-----CONSULTA A MI BASE DE DATOS Y SU RESPONSE---------

            //!-----CONSULTA DE API HASTA LOS 100 RESULTADOS Y SU RESPONSE---------
            let apiVideogames;
            let url;
            let apiResponse = [];

            while(apiResponse.length < 105 ) {
                if (!apiResponse.length) {
                    url = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
                    apiResponse = [...apiResponse, ...url.data.results]
                } else {
                    const next = url.data.next;
                    url = await axios.get(next);
                    apiResponse = [...apiResponse, ...url.data.results];
                }
            }

            apiVideogames = apiResponse.map(vgame => {
                
                let allPlatforms = [];
                vgame.platforms.forEach(platform => {
                    if (!allPlatforms.includes(platform.platform.name)) {
                        allPlatforms = [...allPlatforms, platform.platform.name];
                    }
                });

                return {
                    id:vgame.id,
                    image:vgame.background_image,
                    name:vgame.name,
                    genres:vgame.genres.map(genre => genre.name),
                    rating:vgame.rating,
                    platforms:allPlatforms
                }
            })

            
            //!-----CONSULTA A API HASTA LOS 100 RESULTADOS Y SU RESPONSE---------

            const resultadoFinal = [...dbVideogames,...apiVideogames];  

            if (!resultadoFinal.length) res.send(`No hay juegos con ese nombre...`);    
            else res.send(resultadoFinal);

        } 
        catch (error) {
            next(error);
        }
    }
});

//! -- Trae detalles de un juego por id --

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    
    try {
        if (id.length > 6) {
            const juegoDB = await Videogame.findByPk(id, {
                include:Genre
            });

            res.send(juegoDB);
        
        } else {
        const url = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

        const juegoAPI = {
                image: url.data["background_image"],
                name:url.data.name,
                genres:url.data.genres,
                description:url.data.description,
                release_date:url.data.released,
                rating:url.data.rating,
                platforms:url.data.platforms.map(objPlatform => objPlatform.platform.name)
            }
        
        res.send(juegoAPI);
        }
    } 
    catch (error) {
        next(error); 
    }
})

//! -- MIENTRAS UN JUEGO EXISTENTE NO TENGA EL MISMO NOMBRE, CREA EL JUEGO A TRAVÉS DE LOS DATOS DEL FORM --             
                                    

router.post("/", async (req, res, next) => {
    try {
        const { name, description, release_date, rating, platforms, genres } = req.body;
        name.toLowerCase()

        
        let fechaPreparada;

        if (release_date) {
            fechaPreparada = release_date.split("/").reverse().join("-");
        }

        const [newGame, created] = await Videogame.findOrCreate({
             where:{ name }, 
             defaults:{
                description,
                release_date:fechaPreparada,
                rating, 
                platforms
             }
            });

        const getGeneros = await Promise.all( 
            genres.map(genre => { 
                return Genre.findOne({where:{ name: genre.name}})
            })
        )
      
          const generoId = getGeneros?.map(genero => genero.dataValues.id);
          await newGame.addGenre(generoId);

          res.send("Videojuego creado con éxito");
    } 
    catch (error) {
        next(error)
    }
});

module.exports = router;
