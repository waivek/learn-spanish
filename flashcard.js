

// GLOBALS ARE BAD
// TODO: USE MODULES OR F.P. VOODOO TO DE-GLOBALIZE

var flashcardObject = function() {
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


    };
}();
var changeWordInSpan = function(str) {
    if(typeof str === 'string') {
        word.textContent = str;
    } else {
        alert('Argument \'str\' is not string but ' + typeof str);
    }
};
var isInvalidIndex = function(i) {
    if(i >= array.length || i < 0) {
        return true;
    }
    if(!Number.isInteger(i)) {
        return true;
    }
    return false;
};
var refreshSpan = function() {
    if(isInvalidIndex(i)) {
        alert('Value of i is ' + i + ' which is invalid');
    }
    var obj = array[i];
    var key = Object.keys(obj)[0];
    var value = obj[key];
    var word = is_spanish ? key : value;
    changeWordInSpan(word);
};
var prevWord = function() {
    if(i <= 0) {
        i = array.length;
    }
    i = i-1;
    refreshSpan();
};

var randomWord = function() {
    i = Math.random() * array.length;
    i = Math.floor(i);
    refreshSpan();
};
var nextWord = function() {
    i = (i+1) % array.length;
    refreshSpan();
};

var toggleLanguage = function() {
    is_spanish = !is_spanish;
    refreshSpan();
};

var toggleShuffle = function(button) {
    shuffle = !shuffle;
    if(shuffle) {
        button.innerHTML = 'Shuffle : ON';
    } else {
        button.innerHTML = 'Shuffle : OFF';
    }
};

// nextWord();
