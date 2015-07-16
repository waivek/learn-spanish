
var listOfWords = {
    'ganar' : 'to win',
    'gustar' : 'to like',
    'correr' : 'to run'
};

var addRow = function(word, meaning) {

    tabBody = document.getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");
    cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    textnode1 = document.createTextNode(word);
    textnode2 = document.createTextNode(meaning);

    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    row.appendChild(cell1);
    row.appendChild(cell2);


    tabBody.appendChild(row);


};

var addRows = function(words) {
    var key;
    for(key in words) {
        addRow(key, words[key]);
    }
};

// addRows(listOfWords);

var server = function() {
    var obj = {};
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.status === 200) {
                obj = JSON.parse(xmlhttp.responseText);
            } else {
                alert('it is zero');
            }
        } 
    };
    xmlhttp.open("GET", "file:///X:/Dropbox/js/spanish/index.html:8080", true);
    // xmlhttp.open("GET", "file:///X:/Dropbox/js/spanish/index.html", true);
    xmlhttp.send();
    // document.writeln('The object received is ' + obj);
};

