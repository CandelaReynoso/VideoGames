const express = require('express');
const router = express.Router();
const {getAllVideogames, getAllVideogamesById,getAllVideogamesByName,createVideogames } = require('../controllers/videogames.controller');
const { Videogame } = require('../db')

router.get('/', async (req, res) => {
const {name} = req.query
  try {
    if(name) {
        let videoGamesByName = await getAllVideogamesByName(name)
        if( videoGamesByName.length <= 0){
            res.status(404).send("No results");
        } else {
            res.status(200).json(videoGamesByName);
        }
    } else {
    let videogames = await getAllVideogames();
    res.status(200).send(videogames);
}
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
});

router.get('/:id',async (req,res) =>{
    const { id } = req.params;
      const dataId = await getAllVideogamesById(id);
      console.log(dataId);
      res.status(200).json(dataId);
   })

   
 
router.post('/', async (req, res) => {
    try {
      const { name, description, platforms, image, released, rating, genres } = req.body;
      const createdGame = await createVideogames(name,description, platforms, image, released, rating, genres); 
      res.status(201).send(createdGame);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const deletedGame = await Videogame.destroy({
            where: { id: gameId }
        });

        if (deletedGame === 0) {
            return res.status(404).send('Videogame not found');
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

