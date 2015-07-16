

// GLOBALS ARE BAD
// TODO: USE MODULES OR F.P. VOODOO TO DE-GLOBALIZE

var fobj = function() {
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
        getShuffle: function() {
            return shuffle;
        },
        toggleIsSpanish: function() {
            is_spanish = !is_spanish;
            return is_spanish;
        },
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
        getArrayLength: function() {
            return array.length;
        },
        isInvalidIndex: function() {
            if(i >= array.length || i < 0) {
                return true;
            }
            if(!Number.isInteger(i)) {
                return true;
            }
            return false;
        },
        getCurrentCard: function() {
            return array[i];
        }
    };
}();
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

