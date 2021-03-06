> public/javascripts/flashcard.js
# Flashcard Page

This page will duplicate the features used in Microsoft PowerPoint to give an
efficient tool to help memorize difficult words in Spanish. It will have the
following features

* English-Spanish Mode
* Pictures for individual words
* A gallery on the left hand side to easily select images
* Keyboard Shortcuts
* Ability to change card-list

## Object Creator

fobjCreator has methods which are public but variables which are private. Every
time fobjCreator is called, an fobj is created. This has access to the private
variables through closure. 

    var fobjCreator = function() {
        //TODO: Change to true after development

### Private Variables

By toggling these flags, the program knows how to redraw the webPage everytime
the redraw function  ( in this case refreshSpan() ) is called.

        var is_picture = false;
        var is_spanish = true;
        var is_shuffle = false;

We will store our cards in tuple format, similar to python. We have an array of
objects named array.

        var array = [
            {"PAGAR" : "to pay"},
            {"GUSTAR": "to like"},
            {"HABLAR": "to speak"},
            {"LLEGAR": "to reach, arrive"},
            {"CAMINAR": "to walk"}
        ];

This index determines which word we are on. It goes from 0 to the length of the
array.

        var i = 0;

### Member Functions

The member functions are returned when `fobjCreator` is called. These will have
access to the private variables through a property in JavaScript called
**closure**. Through closures, functions can access properties/variables even
after the program has exited the scope in which these properties/variables exist

        return {


This function is meant to be called when the user wished to change his card set.
It's base purpose is to change the value of the cards in the private `array`
field.

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

The functions `incrementArrayIndex` and `decrementArrayIndex` contain the value
of `i` to never go below 0 or above `array.length - 1`. Basically `i` is in the
range [0, array.length). 

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


The method `setRandomArrayIndex` gives us the shuffle feature when we redraw the
webpage

            // UNTESTABLE
            setRandomArrayIndex: function() {
                i = Math.random() * array.length;
                i = Math.floor(i);
                return i;
            },
            // UNTESTABLE

`getArrayLength` gives access to the length of the array. It is calculated on
the fly and is not stored in any specific varialbe. 
TODO: Why is it not stored in a variable for O(1) access?

            getArrayLength: function() {
                return array.length;
            },

`isInvalidIndex` checks for two conditions:
* Is the index outOfBounds?
* Is the index still in Integer form?
If even one of these conditions is not met, then the index is invalid.

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

`getCurrentCard` gives us the tuple in the form of { "SPANISH WORD": "english
meaning" }

            // UNTESTABLE
            getCurrentCard: function() {
                return array[i];
            }
        };
    };

`is_array` is a function taken verbatim from Douglas Crockford's *JavaScript:
The Good Parts*. It is very difficult to actually tell an array in JavaScript as
an array is technically an object. This is his method to find an array-

> First, we ask if the value is truthy. We do this to reject null and other
> falsy values.  Second, we ask if the typeof value is 'object'. This will be
> true for objects, arrays, and (weirdly) null. Third, we ask if the value has a
> length property that is a number.  This will always be true for arrays, but
> usually not for objects. Fourth, we ask if the value contains a splice method.
> This again will be true for all arrays. Finally, we ask if the length property
> is enumerable (will length be produced by a for in loop?).  That will be false
> for all arrays. This is the most reliable test for arrayness that I have 
> found. It is unfortunate that it is so complicated.

    var is_array = function(value) {
        return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            typeof value.splice === 'function' &&
            !(value.propertyIsEnumerable('length'));
    };

`is_valid_object` checks whether the argument is a valid tuple. 

    var is_valid_object = function(obj) {
        var value = '';
        //TODO: Defensive Programming Over Here
        var key = Object.keys(obj);

We first check if the object has only a single member. If it does, we read the
`key`:`value` pair.

        if(key.length !== 1) {
            return false;
        } else {
            key = key[0];
        }
        value = obj[key];

If either `key` or `value` is not a string, then this cannot possibly be one
of the flashcards and an error has occured.

        if(typeof value !== 'string' || typeof key !== 'string') {
            return false;
        } else {
            return true;
        }
    };

`is_valid_array` checks whether each card in the array passed is a valid card.

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

`setArray` changes the value of the `array` variable. It is meant to be called
when the user wants to change card sets. If the user wants to replace his verb
flashcard set with animal flashcards, then setArray is supposed to be called.

    var setArray = function(a) {
        if(!is_array(a)) {
            console.log('setArray: a is not an array');
        } else if (!is_valid_array(a)){
            console.log('setArray: a is an invalid array'); 
        } else {
            fobj.setArray(a);
        }
    };

## Object Tester

`fobjTester` was meant to test all the functions in fobj and print a list of
results to the console. However, it seems that I cannot reliably test fobj
because I cannot get full access to the private variables. This is more my fault
as I am unaware of how to make efficient and reliable tests

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

## Global Functions

These functions are called my buttons in `flashcard.html`. The functions which
aren't called are present to assist the called functions in some way or the
other.

### getCurrentTuple

Returns the Tuple equivalent of the current card in the flashcard object `fobj`

    var getCurrentTuple = function() {
        if(fobj.isInvalidIndex()) {
            console.log('getCurrentTuple: Value of i is ' + fobj.getArrayIndex() + ' which is invalid');
        }
        return fobj.getCurrentCard();
    };

### getWord

This has two forms -
* getWord('english')
* getWord('spanish')
In both cases the spanish word is retrieved. This is because our data is in a
key-value form where the key is the spanish word. To get the english meaning, we
require the spanish word, but not the other way around.

The `Object.keys` returns an *array* of keys. In this case, because of our data
structure, there will be only 1 key:- the corresponding spanish word. It will be
of the form ['SPANISH-WORD']. Hence we access the 0th element which would simply
be 'SPANISH-WORD'.

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

`toggleShuffle` turns the shuffle mode on and off. It inverts the value of the
variable in `fobj` called `is_shuffle` and changes the text in the button
`top-middle` to match the current state. Functions `nextWord()` and
`prevWord()` check the value of `is_shuffle` before incrementing or decrementing
the array index.

    var toggleShuffle = function() {
        var buttonShuffle = document.getElementById("top-middle");
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

`nextWord` is supposed to act intuitively as the 'next' key people see in music
players. In such music players, there is also a shuffle mode which can be either
OFF or ON. If it is OFF then the function goes to the next card by incrementing
the `fobj.i`. If it is ON then the function chooses a random index. The call to
`refreshSpan()` at the end redraws the webpage with the updated value of
`fobj.i`

    var nextWord = function() {
        if(fobj.getIsShuffle()) {
            fobj.setRandomArrayIndex();
        } else {
            fobj.incrementArrayIndex();
        }
        refreshSpan();
    };

`prevWord` acts similar to `nextWord` however, it decrements the array index
when the shuffle is OFF.

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


`searchKeyPress()` is executed whenever *anything* is entered in the input box
with id="inputCards". It's main purpose is to change the cards when the user
hits ENTER. To check if the user has hit enter, it compares the keyCode which is
the ASCII value of the key entered to 13 which is the ASCII value of ENTER or
more specifically of CARRIAGE RETURN (\r). If so, we execute the simulate the
clicking of the button buttonChangeCardSet.

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


    var setArrayToJson = function(json) {
        fobj.setArray(JSON.parse(json));
    };

`sendGetRequest` is a simple GET request which is to be used in the form of
`sendGetRequest('http://localhost:3000/JSON?word=AR');`

    var sendGetRequest = function (theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, true );

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
                setArrayToJson(xmlHttp.responseText);
                refreshSpan();
            }
        };
        xmlHttp.send();
    };


    var getCardSetName = function () {
        return document.getElementById("inputCards").value;
    };

    var getUrl = function (name) {
        return 'http://localhost:3000/flashcard_change_card_set?word=' + 
            spaceToUnderscore(name);
    };

`changeCardSet` is called when buttonChangeCardSet is pressed. It checks what
cards the user wants, get's the corresponding array and sets fobj to the new
array. `refreshSpan()` call redraws the web-page as the state has changed

    var changeCardSet = function() {
        sendGetRequest(getUrl(getCardSetName()));
    };

    var fobj = fobjCreator();
    var fobjT = fobjTester(fobj);
    // fobjT.test_all();

We are adding an event listener to the entier document. We want keyboard
controls to be consistent through the webpage. 
`keyPressed`: If I replace `function keyPressed` with `var key...`, the code
does not work. The if statement ensures that keys such as JKLP which might be
pressed in a text field, don't unintentionally trigger unwanted behavioiur.

We then assign key-codes as pseudo-constants. After this, we check if a key
which is supposed to have a functionality (as indicated by braces in HTML) was
pressed. If so, we execute said functionality. If not, the function exits.

    document.addEventListener("keydown", keyPressed, false);
    
    // TODO: Find out why the following:
    // var keyPressed = function(e)
    // TODO: Does not work
    function keyPressed (e) {

        if (e.target.nodeName == "INPUT") {
            return ;
        }

        var KEY_CODE_LEFT_KEY = 37;
        var KEY_CODE_RIGHT_KEY = 39;
        var KEY_CODE_J = 74;
        var KEY_CODE_K = 75;
        var KEY_CODE_L = 76;
        var KEY_CODE_P = 80;
        var keyCode = e.keyCode;

        if (keyCode == KEY_CODE_LEFT_KEY || keyCode == KEY_CODE_J) {
            prevWord();
        } else if (keyCode == KEY_CODE_RIGHT_KEY || keyCode == KEY_CODE_K) {
            nextWord();
        } else if (keyCode == KEY_CODE_L) {
            toggleLanguageAndInvertColor();
        } else if (keyCode == KEY_CODE_P) {
            togglePictureAndInvertColor();
        } 
    }

Added a hex to RGB converter. The online colorscheme picker was giving all the
colors in hex format which was a pain to manually convert to RGB.
`hexToRGB` takes a string in hex format and returns a JavaScript compatible
equivalent of the hex color.

    var hexToR = function (h) { return parseInt((cutHex(h)).substring(0,2),16); };
    var hexToG = function (h) { return parseInt((cutHex(h)).substring(2,4),16); };
    var hexToB = function (h) { return parseInt((cutHex(h)).substring(4,6),16); };
    var cutHex = function (h) { return (h.charAt(0)=="#") ? h.substring(1,7):h; };
    var hexToRGB = function (h) {
        h = cutHex (h);
        var r = hexToR (h);
        var g = hexToG (h);
        var b = hexToB (h);

        var rgb = "rgb( " + r +
                     ", " + g +
                     ", " + b + ")";

        return rgb;
    };

`toggleColor` is meant for toggling the color of the upper three buttons in the
flaschard window. As they are boolean flags, it makes visual sense to have their
colors slightly toggled when clicked. We pass a bool to ensure that there is a
proper link between the toggled `element` and this function. I had originally
tried to do toggling based on whether the current `element.style.background` had
value equal to `colorInitial` or `colorFinal` but JavaScript gets confused with
colors when they are converted from Hex to RGB. 

    var toggleColor = function (colorInitial, colorFinal, element, bool) {
        if ( bool ) {
            element.style.background = colorInitial;
        } else {
            element.style.background = colorFinal;
        }
    };

    var togglePictureAndInvertColor = function () {
        var color1 = hexToRGB( "5E0DAC" );
        var color2 = hexToRGB( "8D41D6" );
        togglePicture();
        var left = document.getElementById("top-left");

        toggleColor (color1, color2, left, fobj.getIsPicture());
    };

    var toggleShuffleAndInvertColor = function () {
        var color1 = hexToRGB( "FFC500" );
        var color2 = hexToRGB( "A68000" );
        toggleShuffle();
        var middle = document.getElementById("top-middle");

        toggleColor (color1, color2, middle, fobj.getIsShuffle());
    };

    var toggleLanguageAndInvertColor = function () {
        var color1 = hexToRGB(" 0C5DA5 ");
        var color2 = hexToRGB(" 043A6B ");
        toggleLanguage();
        var right = document.getElementById("top-right");

        toggleColor (color1, color2, right, fobj.getIsSpanish());
    };

`initialize` function should ideally not exist. Try and change code such that
these colors and refreshSpan() are take care of in CSS/HTML

    var initialize = function () {
        var color_is_picture    = hexToRGB( "5E0DAC" );
        var color_isnot_picture = hexToRGB( "8D41D6" );
        var color_is_shuffle    = hexToRGB( "FFC500" );
        var color_isnot_shuffle = hexToRGB( "A68000" );
        var color_is_spanish    = hexToRGB(" 0C5DA5 ");
        var color_isnot_spanish = hexToRGB(" 043A6B ");
        document.getElementById("top-left").style.background = color_isnot_picture;
        document.getElementById("top-middle").style.background = color_isnot_shuffle;
        document.getElementById("top-right").style.background = color_is_spanish;
        refreshSpan();
    };
    initialize();
