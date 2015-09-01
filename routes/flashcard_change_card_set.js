var express = require('express');
var router = express.Router();


var getArray = function(word) {
    var json = [
            {"COCINAR" : "to cook"},
            {"LLORAR" : "to cry"},
            {"MONTAR" : "to ride"}
        ];
    return json;
};

router.get('/', function(req, res, next) {
    var word = req.query.word;
    res.json(getArray(word));
});

module.exports = router;
