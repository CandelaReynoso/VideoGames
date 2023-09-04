const axios = require('axios');
const { Genres, API_KEY } = require('../db'); // Asegúrate de que la importación sea correcta
 // Reemplaza con tu clave de API

const getAllGenresApi = async () => {
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const dataGenres = apiGenres.data
    const genres = dataGenres.results.map(g => g.name)

    genres.map(g => Genres.findOrCreate({
        where:{
            name: g
        }
    }))

    const allGenres = await Genres.findAll();

    return allGenres;
};

module.exports = {
  getAllGenresApi,
};
