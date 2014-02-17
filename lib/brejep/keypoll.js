define(function () {
    'use strict';

    var globalTarget;
    var keys = {};

    var onKeyDown = function (event) {
        keys[event.keyCode] = true;
    };

    var onKeyUp = function (event) {
        if (keys[event.keyCode]) {
            keys[event.keyCode] = false;
        }
    };

    var KeyPoll = {

        initialise: function(target) {
            globalTarget = target;
            if (globalTarget) {
                globalTarget.addEventListener('keydown', onKeyDown);
                globalTarget.addEventListener('keyup', onKeyUp);
            }
        },

        destroy: function() {
            if (globalTarget) {
                globalTarget.removeEventListener( 'keydown', onKeyDown);
                globalTarget.removeEventListener( 'keyup', onKeyUp);
            }
        },

        isDown: function(testKey) {
            return keys[testKey];
        },

        addEventListener: function(e, callback, scope) {
            if (globalTarget) {
                globalTarget.addEventListener(e, 
                    function(e) { callback(e, scope); }
                );
            }
        }
    };

    return KeyPoll;
});
