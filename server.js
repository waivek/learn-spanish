var serveStatic = require('serve-static');
var fs = require('fs');

var printRequestDetails = function(request) {
    console.log('request.method = ' + request.method);
    console.log('request.url = ' + request.url);
};

var getArray = function(array_name) {
    return [
            {"COCINAR" : "to cook"},
            {"LLORAR" : "to cry"},
            {"MONTAR" : "to ride"}
    ];
};
var createJson = function(new_arr) {
    var json = JSON.stringify(new_arr);
    return json;
};

var getNewCardSet = function (request, response) {
    console.log('Request handler getNewCardSet was called');
    response.writeHead(200, {"Content-Type": "application/json"});
    var json = createJson(getArray());
    response.end(json);
    console.log(json + ' was sent');
};

var loadFlashcardHTML = function (request, response) {
    printRequestDetails(request);
    console.log('loadFlashcardHTML: called');
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(".\\flashcard.html").pipe(response);
};

var loadFlashcardCSS = function (request, response) {
    printRequestDetails(request);
    console.log('loadFlashcardCSS: called');
    response.writeHead(200, {"Content-Type": "text/css"});
    fs.createReadStream(".\\flashcard.css").pipe(response);
};

var loadFlashcardJS = function (request, response) {
    printRequestDetails(request);
    console.log('loadFlashcardJS: called');
    response.writeHead(200, {"Content-Type": "text/js"});
    fs.createReadStream(".\\flashcard.js").pipe(response);
};


var connect = require('connect');
var http = require('http');

var app = connect();
app.use('/flashcard.html', loadFlashcardHTML);
app.use('/flashcard.css', loadFlashcardCSS);
app.use('/flashcard.js', loadFlashcardJS);


// http.createServer(function (request, response) {
//     // console.log('New connection');
//     // userCount++;
//     //
//     // response.writeHead(200, {'Content-Type': 'text/plain'});
//     // response.write('Hello!\n');
//     // response.write('We have had ' + userCount + ' visits!\n');
//     // response.end();
// }).listen(8080);
http.createServer(app).listen(8080);


console.log('Server started...');

