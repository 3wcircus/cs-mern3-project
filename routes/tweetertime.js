var express = require('express');
var router = express.Router();

// - Show 5 most recent tweets of all public tweets sorted by latest.
router.get('/tweeters/tweets/:kount', function (req, res, next) {
    res.render('index.pug', {title: 'Get Public Tweets'});
});

// Search tweets
router.get('/tweeters/tweets/search/:searchterm', function (req, res, next) {
    res.render('index.pug', {title: 'Search Tweets'});
});


router.get('/tweeters/tweets/search/:searchterm', function (req, res, next) {
    res.render('index.pug', {title: 'Search Tweets'});
});


router.get('/tweeters/tweets/search/:searchterm', function (req, res, next) {
    res.render('index.pug', {title: 'Search Tweets'});
});


module.exports = router;