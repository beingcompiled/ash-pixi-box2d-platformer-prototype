define(['ash'], function (Ash) {

    var GameState = Ash.Class.extend({

        constructor: function (width, height, palette) {

            this.width = width; //originally set by canvas css
            this.height = height; //originally set by canvas css
            this.worldWidth = null;
            this.worldHeight = null;
            this.palette = palette; //default palette
            this.zoom = 0.5; //originally set in game.js
            this.cullingRange = 50;

            // device support
            this.highPerformance = false; //webGL or canvas
            this.touchable = false; //touch events
            this.soundSupport = false; //web audio api
            this.stepRate = 1/60;
            this.isRetina = false;
        }
    });

    return GameState;
});