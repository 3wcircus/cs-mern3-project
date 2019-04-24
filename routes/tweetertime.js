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


// Get a specific Tweeter
router.get('/tweets/:id', function (req, res, next) {
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

//
//
// var express = require('express');
// var router = express.Router();
// var ObjectID = require('mongodb').ObjectID;
// var BleatCollection = require("../models/BleatSchema");
//
//
// /* GET home page. */
// router.get('/', function (req, res, next) {
//     console.log("we bleatin bro");
//     let bleatArray = [];
//     BleatCollection.find({}, (errors, results) => {
//         if (errors) res.send(errors);
//         else {
//             console.log("We Found this!!");
//             for (i = 0; i < results.length; i++) {
//                 // console.log(results[i].bleat);
//                 for (x = 0; x < results[i].bleat.length; x++) {
//                     if (results[i].bleat[x].private) {
//                     } else {
//                         // if (bleatArray.length === 5) {
//                         //     console.log("max reached");
//                         //     break
//                         // }
//                         let bleat = {username: results[i].username, bleat: results[i].bleat[x]};
//                         // console.log(bleat);
//                         bleatArray.push(bleat);
//
//                     }
//                 }
//             }
//             console.log("sorting");
//             // console.log(bleatArray[2].bleat.created);
//             bleatArray.sort(function (a, b) {
//                 return b.bleat.created - a.bleat.created
//             });
//             // console.log("results:");
//             console.log(bleatArray);
//             res.json(bleatArray)
//         }
//     });
//
// });
//
// router.post("/locateBleatToEdit",(req,res)=>
// {
//     let bleat = {};
//     console.log("hit the server");
//     BleatCollection.findOne({"bleat._id":{_id:req.body.bleatId}},(errors,results)=>
//     {
//         // console.log(req.body.bleatId);
//         if(errors) res.send(errors);
//         else{
//             // console.log(results.bleat);
//             for (i = 0; i < results.bleat.length; i++) {
//                 // console.log(results.bleat[i]);
//                 if(results.bleat[i]._id == req.body.bleatId)
//                 {
//                     console.log("Found IT!");
//                     res.json(results.bleat[i]);
//                     // console.log("this is the bleat" +bleat)
//                 }
//             }
//         }
//
//     })
// });
//
// router.put("/editBleat", (req, res) => {
//     BleatCollection.findOneAndUpdate({"bleat._id": req.body._id},
//         {$set:{"bleat.$": req.body}}, (errors, results) => {
//             if (errors) res.send(errors);
//             else {
//                 console.log("bleat updated");
//                 res.send("made it through??")
//             }
//         });
// });
//
// router.post("/findBleats", (req, res) => {
//     BleatCollection.find({username: req.body.username}, (errors, results) => {
//         if (errors) res.send(errors);
//         else (res.send(results[0].bleat))
//     })
// });
//
// router.post("/addBleat", (req, res) => {
//     BleatCollection.findOneAndUpdate({username: req.body.username},
//         {$push: {bleat: req.body}}, (errors, results) => {
//             if (errors) res.send("errors:" + errors);
//             else res.send("You Bleated!!");
//         });
//     console.log("Got this:\n"+req.body.json);
// });
//
//
//
// router.post("/searchBleats", (req, res) => {
//     let bleatArray = [];
//     BleatCollection.find({"bleat.message": {"$regex": req.body.query}}, (errors, results) => {
//         console.log("something happened");
//         console.log(results);
//         for (i = 0; i < results.length; i++) {
//             // console.log(results[i].bleat);
//             for (x = 0; x < results[i].bleat.length; x++) {
//                 if (results[i].bleat[x].private) {
//
//                 }
//                 if (results[i].bleat[x].message.includes(req.body.query)) {
//
//                     let bleat = {username: results[i].username, bleat: results[i].bleat[x]};
//                     // console.log(bleat);
//                     bleatArray.push(bleat);
//
//                 }
//             }
//         }
//         // console.log(bleatArray[2].bleat.created);
//         // console.log("results:");
//         // console.log(bleatArray);
//         res.json(bleatArray)
//     })
// });
//
// module.exports = router;
