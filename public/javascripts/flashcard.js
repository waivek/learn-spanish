var fobjCreator = function() {
    //TODO: Change to true after development
    var is_picture = false;
    var is_spanish = true;
    var is_shuffle = false;
    var array = [
        {"PAGAR" : "to pay"},
        {"GUSTAR": "to like"},
        {"HABLAR": "to speak"},
        {"LLEGAR": "to reach, arrive"},
        {"CAMINAR": "to walk"}
    ];
    var i = 0;
    return {
        setArray: function(new_array) {
            array = new_array;
        },
        toggleIsPicture: function() {
            is_picture = !is_picture;
            return is_picture;
        },
        getIsPicture: function() {
            return is_picture;
        },
        toggleIsShuffle: function() {
            is_shuffle = !is_shuffle;
            return is_shuffle;
        },
        getIsShuffle: function() {
            return is_shuffle;
        },
        toggleIsSpanish: function() {
            is_spanish = !is_spanish;
            return is_spanish;
        },
        // UNTESTABLE
        getIsSpanish: function() {
            return is_spanish;
        },
        getArrayIndex: function() {
            return i;
        },
        incrementArrayIndex: function() {
            i = (i+1) % array.length;
            return i;
        },
        decrementArrayIndex: function() {
            if(i <= 0) {
                i = array.length;
            }
            i = i-1;
            return i;
        },
        // UNTESTABLE
        setRandomArrayIndex: function() {
            i = Math.random() * array.length;
            i = Math.floor(i);
            return i;
        },
        // UNTESTABLE
        getArrayLength: function() {
            return array.length;
        },
        // UNTESTABLE
        isInvalidIndex: function() {
            if(i >= array.length || i < 0) {
                return true;
            }
            if(!Number.isInteger(i)) {
                return true;
            }
            return false;
        },
        // UNTESTABLE
        getCurrentCard: function() {
            return array[i];
        }
    };
};
var is_array = function(value) {
    return value &&
        typeof value === 'object' &&
        typeof value.length === 'number' &&
        typeof value.splice === 'function' &&
        !(value.propertyIsEnumerable('length'));
};
var is_valid_object = function(obj) {
    var value = '';
    //TODO: Defensive Programming Over Here
    var key = Object.keys(obj);
    if(key.length !== 1) {
        return false;
    } else {
        key = key[0];
    }
    value = obj[key];
    if(typeof value !== 'string' || typeof key !== 'string') {
        return false;
    } else {
        return true;
    }
};
var is_valid_array = function(array) {
    var bool = true;
    var i;
    for(i = 0; i < array.length; i++) {
        if(!is_valid_object(array[i])) {
            bool = false;
        }
    }
    return bool;
};
var setArray = function(a) {
    if(!is_array(a)) {
        console.log('setArray: a is not an array');
    } else if (!is_valid_array(a)){
        console.log('setArray: a is an invalid array'); 
    } else {
        fobj.setArray(a);
    }
};
var fobjTester = function(fobj) {
    return {
        test_toggleIsSpanish: function() {
            if(fobj.getIsSpanish() === !fobj.toggleIsSpanish()) {
                console.log('function OK: toggleIsSpanish');
                return true;
            } else {
                console.log('ERROR: toggleIsSpanish');
                return false;
            }
        },
        test_incrementArrayIndex: function() {
            var oldIndex = fobj.getArrayIndex();
            var newIndex = fobj.incrementArrayIndex();
            if(newIndex - oldIndex === 1) {
                console.log('function OK: incrementArrayIndex');
                return true;
            } else {
                console.log('ERROR: incrementArrayIndex');
                return false;
            }
        },
        test_decrementArrayIndex: function() {
            var oldIndex = fobj.getArrayIndex();
            var newIndex = fobj.decrementArrayIndex();
            if(oldIndex - newIndex === 1) {
                console.log('function OK: decrementArrayIndex');
                return true;
            } else {
                console.log('ERROR: decrementArrayIndex');
                return false;
            }
        },
        test_all: function() {
            var fobjT = fobjTester(fobj);
            var key = '';
            var name = '';
            var starts_with_get = false;
            var is_function = false;
            var is_getter_function = false;
            for(key in fobjT) {
                if(key !== 'test_all' && typeof fobjT[key] === 'function') {
                    fobjT[key]();
                }
            }
            console.log('Value of private variables:');
            for(key in fobj) {
                starts_with_get = key.substring(0,3) === 'get';
                is_function = typeof fobj[key] === 'function';
                is_getter_function = starts_with_get && is_function;
                if(is_getter_function) {
                        name = key.substring(3);
                        console.log('Value of ' + name + ' is ' + fobj[key]());
                }
            }
        }
    };
};
var getCurrentTuple = function() {
    if(fobj.isInvalidIndex()) {
        console.log('getCurrentTuple: Value of i is ' + fobj.getArrayIndex() + ' which is invalid');
    }
    return fobj.getCurrentCard();
};
var getWord = function(lang) {
    var obj = getCurrentTuple();
    var spanish_word = Object.keys(obj)[0];
    var return_value = '';
    if (lang === 'spanish') {
        return_value = spanish_word;
    } else if (lang === 'english') {
        return_value = obj[spanish_word];
    } else {
        alert('getWord: value of lang is invalid');
        console.log(lang);
    }
    return return_value;
};
var getWordInSpanish = function() {
    return getWord('spanish');
};
var getWordInEnglish = function() {
    return getWord('english');
};
    
// var getWordInEnglish = function() {
var setSpanHTML = function(str) {
    var span_word = document.getElementById('word');
    span_word.innerHTML = str;
};
var imageOn = function() {
    img_src = getImageLocation();
    setSpanHTML('<img src = "' + img_src + '">');
};
var imageOff = function() {
    setSpanHTML('');
};
var refreshSpan = function() {
    if (fobj.getIsPicture()) {
        imageOn();
    } else {
        var word = fobj.getIsSpanish() ? getWordInSpanish() : 
            getWordInEnglish();
        setSpanHTML(word);
    }
};
var getImageLocation = function() {
    return 'images/' + getWordInSpanish().toUpperCase() + '.jpg';
};
var toggleShuffle = function() {
    var buttonShuffle = document.getElementById("buttonShuffle");
    var innerText = '';
    fobj.toggleIsShuffle();
    if(fobj.getIsShuffle()) {
        innerText = 'Shuffle: ON';
    } else {
        innerText = 'Shuffle: OFF';
    }
    buttonShuffle.innerHTML = innerText;
    refreshSpan();
};
var togglePicture = function() {
    fobj.toggleIsPicture();
    if(!fobj.getIsPicture()) {
        imageOff();
    }
    refreshSpan();
};
var randomWord = function() {
    fobj.setRandomArrayIndex();
    refreshSpan();
};
var nextWord = function() {
    if(fobj.getIsShuffle()) {
        fobj.setRandomArrayIndex();
    } else {
        fobj.incrementArrayIndex();
    }
    refreshSpan();
};
var prevWord = function() {
    if(fobj.getIsShuffle()) {
        fobj.setRandomArrayIndex();
    } else {
        fobj.decrementArrayIndex();
    }
    refreshSpan();
};
var toggleLanguage = function() {
    fobj.toggleIsSpanish();
    refreshSpan();
};
var searchKeyPress = function(e) {
    e = e || window.event;
    if(e.keyCode === 13) {
        document.getElementById("buttonChangeCardSet").click();
        return false;
    }
    return true;
};
var spaceToUnderscore = function(str) {
    return str.split(' ').join('_');
};
var printXMLHTTPInformation = function(xmlHttp) {
    console.log('xmlhttp.readyState is ' + xmlHttp.readyState);
    console.log('xmlhttp.status is ' + xmlHttp.status);
    console.log('httpGet: xmlHttp.responseText is ' + xmlHttp.responseText);
};
var globalJSON = '';
var httpGet = function (theUrl) {
    var xmlHttp = new XMLHttpRequest();
    var array = [];
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            array = JSON.parse(xmlHttp.responseText);
        }
    };
    xmlHttp.send();
    return array;
};
var getCardCollection = function(name) {
    var url = 'http://localhost:3000/flashcard_change_card_set?word=' + 
        spaceToUnderscore(name);
    return httpGet(url);
};
var changeCardSet = function() {
    var card_set_name = document.getElementById("inputCards").value;
    var new_array = getCardCollection(card_set_name);
    fobj.setArray(new_array);
    refreshSpan();
};
var fobj = fobjCreator();
var fobjT = fobjTester(fobj);
// fobjT.test_all();
