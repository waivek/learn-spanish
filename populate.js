console.log("HELLO WORLD");
var fs = require('fs');

fs.readFile('file.txt', function(err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
        console.log(array[i]);
    }
});
