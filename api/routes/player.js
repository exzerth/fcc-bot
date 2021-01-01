const express = require('express');
const router = express.Router()
const fs = require('fs');
const playerController = require('../controllers/player');


/* router.get('/view', playerController.getUser) */
router.post("/register", playerController.registerUser)
      .get('/users', playerController.getUser)
      .get('/tables', playerController.showTables)

module.exports = router;