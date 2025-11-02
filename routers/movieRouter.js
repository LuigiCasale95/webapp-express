// importo il framework express
const express = require("express");

// importiamo il controller
const movieController = require('../controllers/movieController');

// settiamo il router
const router = express.Router();

// index
router.get('/', movieController.index)

// show
router.get('/:id', movieController.show)

module.exports = router;