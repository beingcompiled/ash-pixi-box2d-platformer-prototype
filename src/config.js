require.config({

    deps: ["app"],

    paths: {
       
        //engine
        "ash"               : "../lib/ash/ash",
        "brejep"            : "../lib/brejep",

        //lib utilities
        "modernizr"         : "../lib/vendor/modernizr",
        "underscore"        : "../lib/vendor/underscore/underscore-min",
        "stats"             : "../lib/vendor/stats",

        //lib
        "box2D"             : "../lib/vendor/box2D/Box2dWeb.min",
        "pixi"              : "../lib/vendor/pixi/pixi.dev",

        //lib audio
        "audio"             : "../lib/vendor/jsfx/audio",
        "jsfx"              : "../lib/vendor/jsfx/jsfx",
        "jsfxlib"           : "../lib/vendor/jsfx/jsfxlib"
    },

    shim: {

        //lib utilities
        "modernizr": {
            "exports": "Modernizr"
        },
        "underscore": {
            "exports": "_"
        },
        "stats": {
            "exports": "Stats"
        },

        //lib
        "box2D": {
            "exports": "Box2D"
        },
        "pixi": {
            "exports": "PIXI"
        },
        //lib audio
        "audio": {
            "exports": "audio"
        },
        "jsfx": {
            "exports": "jsfx"
        },
        "jsfxlib": {
            "exports": "jsfxlib"
        }
    }
});