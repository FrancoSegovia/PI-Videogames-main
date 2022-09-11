const { Router } = require('express');
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

const router = Router();
router.use(express.json());
const cors = require("cors");


router.get("/", async (req, res) => {

    try {
        const url = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const count = await Genre.count();

        if (count === 0) {
            const apiGenres = url.data.results.map(genre => genre.name).map(e => { return {name:e} });
            await Genre.bulkCreate(apiGenres);
        }

        const getGenres = await Genre.findAll();
        
        res.send(getGenres);
    } catch (error) {
        res.status(404).json(error);
    }

})

module.exports = router;