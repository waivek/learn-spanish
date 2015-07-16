var fobjCreator = function() {
    var shuffle = false;
    var is_spanish = true;
    var i = 0;
    var array = [
        {"PAGAR" : "to pay"},
        {"GUSTAR": "to like"},
        {"HABLAR": "to speak"},
        {"CORRER": "to run"},
        {"CAMINAR": "to walk"}
    ];
    return {
        toggleShuffle: function() {
            shuffle = !shuffle;
            return shuffle;
        },
        // UNTESTABLE
        getShuffle: function() {
            return shuffle;
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
        // UNTESTABLE
        getCurrentCard: function() {
            return array[i];
        }
    };
};
var fobjTester = function(fobj) {
    return {
        test_toggleShuffle: function() {
            if(fobj.getShuffle() === !fobj.toggleShuffle()) {
                console.log('function OK: toggleShuffle');
                return true;
            } else {
                console.log('ERROR: toggleShuffle');
                return false;
            }
        }, 
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
            var key;
            for(key in fobjT) {
                if(key !== 'test_all' && typeof fobjT[key] === 'function') {
                    fobjT[key]();
                }
            }
        }
    };
};
var changeWordInSpan = function(str) {
    if(typeof str === 'string') {
        word.textContent = str;
    } else {
        alert('Argument \'str\' is not string but ' + typeof str);
    }
};
var refreshSpan = function() {
    if(fobj.isInvalidIndex()) {
        alert('Value of i is ' + fobj.getArrayIndex() + ' which is invalid');
    }
    var obj = fobj.getCurrentCard();
    var key = Object.keys(obj)[0];
    var value = obj[key];
    var word = fobj.getIsSpanish() ? key : value;
    changeWordInSpan(word);
};
var prevWord = function() {
    fobj.decrementArrayIndex();
    refreshSpan();
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

var toggleShuffle = function(button) {
    shuffle = fobj.toggleShuffle();
    if(shuffle) {
        button.innerHTML = 'Shuffle : ON';
    } else {
        button.innerHTML = 'Shuffle : OFF';
    }
};

var fobj = fobjCreator();
var fobjT = fobjTester(fobj);
fobjT.test_all();
