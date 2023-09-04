
const axios = require ('axios');
const {Videogame, Genres, API_KEY} = require('../db');


//Videogames from API
const getAllVideoGamesFromApi = async () => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
      const games = response.data.results.map(v => ({
        id: v.id,
        name: v.name,
        image: v.background_image,
        rating: v.rating.toFixed(2),
        genres: v.genres?.map(g => g.name),
        platforms: v.platforms?.map(p => p.platform.name),
        released: v.released
      }));
      return games;
    } catch (error) {
      console.error('Error fetching video games:', error);
      throw error;
    }
  };

// Videogames from DB.
const dbVideogames = async () => {
 let dbInfo = await Videogame.findAll({
    include:{
        model:Genres,
        attributes: ['name'],
        through: {
            attributes: [],
        }
    } 
 })
 return dbInfo;
}

// Videogames from DB + API
const getAllVideogames = async function() {
    const apiInfo = await getAllVideoGamesFromApi();
    const dbInfo = await dbVideogames();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}

//VideoGames By Id from API
const getApiInfoById = async function (id) {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const data = response.data; // No es necesario mapear aquí, ya que es un solo objeto
      const formattedData = {
        id: data.id,
        name: data.name,
        image: data.background_image,
        rating: data.rating.toFixed(5),
        genres: data.genres?.map(g => g.name),
        platforms: data.platforms?.map(p => p.platform.name),
        released: data.released
      };
      return formattedData;
    } catch (error) {
      console.error('Error fetching API info by ID:', error);
      throw error;
    }
  }
  
  const getDbInfoById = async function (id) {
    try {
      const dbInfo = await Videogame.findOne({
        where: {
          id: id
        },
        include: [{
          model: Genres,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }]
      });
      return dbInfo;
    } catch (error) {
      console.error('Error fetching DB info by ID:', error);
      throw error;
    }
  }
  
  const getAllVideogamesById = async function (id) {
    if (isNaN(id)) {
      const dbInfo = await getDbInfoById(id);
      return dbInfo;
    } else {
      const apiInfo = await getApiInfoById(id);
      return apiInfo;
    }
  }

   // videogames by name from API
   const getApiInfoByName = async function(name) {  
    let gamesData = [];

    const urlData = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    console.log(urlData.data)
    urlData.data.results.forEach(v => {
        if(gamesData.length < 15) {
            gamesData.push({
                id: v.id,
                name: v.name,
                description: v.description,
                image: v.background_image,
                released: v.released,
                rating: v.rating.toFixed(5),
                platforms: Array.isArray(v.platforms)?v.platforms.map(p => p.platform.name):"Unspecified platform",
                genres: v.genres?.map(g => g.name)
        })}
    })

    return gamesData;
}

  // videogames by name in DB
  const getDbInfoByName = async (name) => {
    const videoGames = await Videogame.findAll({
      where: {
        name: {
            [Op.iLike]: '%' + name + '%'
        }
      },
      include:{
        model:Genres,
        attributes:['name'],
        through : {
            attributes: [],
        }
      } 
    })
    return videoGames;
  }
  // global Search by name (API + DB)
  const getAllVideogamesByName = async (name) => {
    const dbResults = await getDbInfoByName(name);
    const apiResults = await  getApiInfoByName(name)
    const allResults = dbResults.concat(apiResults);
    return allResults.slice(0,15);
  }
 
  const createVideogames = async (name, description, platforms, image, released, rating, genres) => {
    if (!name /* || !description || !platforms || !image */) {
      throw new Error('Missing data to create a videogame');
    } else {
      const newGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        image,
        genres,
        platforms
      });
  
      const newGenres = await Genres.findAll({
        where: {
          name: genres,
        },
      });
  
      await newGame.addGenres(newGenres);
  
      return newGame;
    }
  };


module.exports = {
  getAllVideogames,
  getAllVideogamesById,
  getAllVideogamesByName,
  createVideogames,
};