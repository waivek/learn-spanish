var fobjCreator = function() {
    //TODO: Change to true after development
    var is_picture = false;
    var is_spanish = true;
    var i = 0;
    var array = [
        {"PAGAR" : "to pay"},
        {"GUSTAR": "to like"},
        {"HABLAR": "to speak"},
        {"LLEGAR": "to reach, arrive"},
        {"CAMINAR": "to walk"}
    ];
    return {
        toggleIsPicture: function() {
            is_picture = !is_picture;
            return is_picture;
        },
        getIsPicture: function() {
            return is_picture;
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
        // UNTESTABLE
        setRandomArrayIndex: function() {
            i = Math.random() * array.length;
            i = Math.floor(i);
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
        toggleImage: function() {
        },
        // UNTESTABLE
        getCurrentCard: function() {
            return array[i];
        }
    };
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
        alert('Value of i is ' + fobj.getArrayIndex() + ' which is invalid');
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

var setDivWord = function(str) {
    var div_word = document.getElementById('word');
    div_word.innerHTML = str;
};
var imageOn = function() {
    img_src = getImageLocation();
    setDivWord('<img src = "' + img_src + '">');
};
var imageOff = function() {
    setDivWord('');
};
var refreshSpan = function() {
    if (fobj.getIsPicture()) {
        imageOn();
    } else {
        var word = fobj.getIsSpanish() ? getWordInSpanish() : getWordInEnglish();
        setDivWord(word);
    }
};
var prevWord = function() {
    fobj.decrementArrayIndex();
    refreshSpan();
};

var getImageLocation = function() {
    var spanish_word = getWordInSpanish();
    var upper_case_spanish_word = spanish_word.toUpperCase();
    var image_location = 'images/' + upper_case_spanish_word + '.jpg';
    return image_location;
};
var togglePicture = function() {
    fobj.toggleIsPicture();
    if(fobj.getIsPicture()) {
        imageOn();
    } else {
        imageOff();
        refreshSpan();
    }
};

var randomWord = function() {
    fobj.setRandomArrayIndex();
    refreshSpan();
};
var nextWord = function() {
    fobj.incrementArrayIndex();
    refreshSpan();
};

var toggleLanguage = function() {
    fobj.toggleIsSpanish();
    refreshSpan();
};


var fobj = fobjCreator();
var fobjT = fobjTester(fobj);
fobjT.test_all();
