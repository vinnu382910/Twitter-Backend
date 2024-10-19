const ensureAuthenticated = require('../Middlewares/Auth')
const { validateTweet } = require('../Middlewares/TweetValidation')
const { postTweet } = require('../Controllers/TweetController.js');

const router = require('express').Router();

router.post('/tweet', ensureAuthenticated, validateTweet, postTweet);

module.exports = router;