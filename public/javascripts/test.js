/**
  * Created by waivek on 31-12-2015. * Created by waivek on 31-12-2015. * Created by waivek on 31-12-2015. * Created by waivek on 31-12-2015.* Created by waivek on 31-12-2015.
 */

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
var fobjT = fobjTester(fobj);
// fobjT.test_all();

var printHelloWorld = function () {
    console.log("Hello, World!");
};
