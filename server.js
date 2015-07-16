var http = require('http');

var userCount = 0;

var getWordMeanings = function (response) {
    console.log('Request handler getWordMeanings was called');
    response.writeHead(200, {"Content-Type": "application/json"});
    var otherArray = ["item1", "item2"];
    var otherObject = {
        item1: "item1val",
        item2: "item2val"
    };
    var json = JSON.stringify({
        anObject: otherObject,
        anArray: otherArray,
        another: "item"
    });
    response.end(json);
    // console.log(json + ' was sent');
};

http.createServer(function (request, response) {
    getWordMeanings(response);
    // console.log('New connection');
    // userCount++;
    //
    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write('Hello!\n');
    // response.write('We have had ' + userCount + ' visits!\n');
    // response.end();
}).listen(8080);

console.log('Server started');

