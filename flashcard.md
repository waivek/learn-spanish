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

By toggling these flags, the program knows how to redraw the webPage everytime
the redraw function  ( in this case refreshSpan() ) is called.

        var is_picture = false;
        var is_spanish = true;

We will store our cards in tuple format, similar to python. We have an array of
objects named array.

        var hello = 'hello';
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

We have certain basic functions which don't really do anything other than what
it says they do in their names. The first few are some of them.

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
    var is_array = function(value) {
        return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            typeof value.splice === 'function' &&
            !(value.propertyIsEnumberable('length'));
    };
    var is_valid_object = function(obj) {
        var value = '';
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
            if(!is_valid_object(a[i])) {
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
    var prevWord = function() {
        fobj.decrementArrayIndex();
        refreshSpan();
    };

    var getImageLocation = function() {
        return 'images/' + getWordInSpanish().toUpperCase() + '.jpg';
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

