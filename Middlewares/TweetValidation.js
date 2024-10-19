// Tweet Validation Middleware
const validateTweet = (req, res, next) => {
    const { tweet } = req.body;
  
    // Check if tweet content exists
    if (!tweet) {
      return res.status(400).send({ message: 'Tweet content is required' });
    }
  
    // Check if tweet length is valid (Twitter-like 280 character limit)
    if (tweet.length > 280) {
      return res.status(400).send({ message: 'Tweet cannot exceed 280 characters' });
    }
  
    next(); // Proceed if all checks pass
  };
  
  module.exports = {validateTweet };
  