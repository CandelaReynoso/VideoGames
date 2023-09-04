const { Router } = require('express');
const { getAllGenresApi } = require('../controllers/genres.controller');
const router = Router();


router.get('/', async (req,res) => {
    const genres = await getAllGenresApi(); //me da la lista de genres creados
    try {
        res.status(200).send(genres); 
    } catch (error) {
        res.status(404).send(error.message); 
    }
})





module.exports = router;
