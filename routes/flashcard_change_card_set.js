var express = require('express');
var router = express.Router();
var cards =  require('../flashcard.json');

var getArray = function(word) {
    var json = cards[word];
    return json;
};

router.get('/', function(req, res, next) {
    var word = req.query.word;
    res.json(getArray(word));
});

module.exports = router;
