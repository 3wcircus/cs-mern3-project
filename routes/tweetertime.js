var express = require('express');
var router = express.Router();
var TweeterCollection = require('../models/user');

// - Show 5 most recent tweets of all public tweets sorted by latest.
// FIXME: Sort and get just the number
router.get('/tweets/:kount?', function (req, res, next) {
    let numberOfTweets = req.params.kount ? req.params.kount : 5;
    // TweeterCollection.find().sort({signUpDate:-1}).limit(numberOfTweets)
    console.log(`Get ${numberOfTweets} Public Tweets`);
    TweeterCollection.find({}).sort({signUpDate: -1}).limit(parseInt(numberOfTweets), (errors, results) => {
        if (errors) res.send(errors);
        else {
            res.send(results)
        }
    })
    // res.render('index.pug', {title: `Get ${numberOfTweets} Public Tweets`});
});

// Search tweets
// TODO: Actually implement this
router.get('/tweets/search/:searchterm', function (req, res, next) {
    res.render('index.pug', {title: 'Search Tweets'});
});

// Create a new tweeter
// TODO: This doesnt need an update right?
router.post('/tweets', (req, res) => {
    TweeterCollection.findOneAndUpdate({username: req.body.username},
        {$push: {tweets: req.body}}, (errors, tweet) => {
            if (errors) res.send(errors);
            else res.send(tweet);
        });
});

// Update an existing tweet
router.put('/tweets/:id/:tid', (req, res) => {
    TweeterCollection.updateOne({_id: req.params.id, "tweets._id": req.params.tid},
        {
            $set: {
                "tweets.$.title": req.body.title,
                "tweets.$.img": req.body.img,
                "tweets.$.private": req.body.private
            }
        }, (errors, tweet) => {
            if (errors) res.send(errors);
            else {
                res.send(tweet)
            }
        });
});


module.exports = router;
