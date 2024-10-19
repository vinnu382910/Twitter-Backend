const ensureAuthenticated = require('../Middlewares/Auth')
const { getAllTweets } = require('../Controllers/GetAllTweets.js');
const router = require('express').Router();

router.get('/', ensureAuthenticated, getAllTweets);

module.exports = router;