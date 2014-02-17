define(['utils/Perlin', 'utils/MathUtils', 'pixi'], function(Perlin, MathUtils, PIXI) { 

    "use strict";

    function PerlinView(args, gameState) {
    
        var self = this;
        PIXI.DisplayObjectContainer.call(self);

        self.id = args.id;
        self.width = args.width;
        self.height = args.height;
        self.fill = args.fill;       
        self.state = null;
        self.gameState = gameState;

        var w = self.width,
            h = self.height*1.2,
            h25 = self.height * 0.25,
            w5 = self.width * 0.5,
            h5 = self.height * 0.5,
            g = new PIXI.Graphics();

        var spacing = h*0.2 * self.id;
        g.position.x = -w5;
        g.position.y += spacing + h*0.2;

        var pNoise, freq;
        if (!this.gameState.highPerformance) {
            pNoise = Perlin.getPerlinNoise1D(w5, _.random(1, 7), _.random(1, 7));
            //*note: width decreases with lower values
            freq = 0.01;
        } else {
            pNoise = Perlin.getPerlinNoise1D(w5, _.random(1, 4), _.random(1, 4));
            freq = 0.01;
        }

        self.draw = function() {
            
            g.clear();
            g.beginFill(self.fill);
            g.moveTo(0, 0);
            for (var i=0; i<pNoise.length; i++) {
                var a = pNoise[i] * h;
                g.lineTo(i * freq, a);
            }
            g.lineTo(i * freq, h);
            g.lineTo(0, h);
            g.lineTo(0, 0);

            //*note: alpha very costly
            if (this.gameState.highPerformance) g.alpha = _.random(0.2, 1);

            g.scale.x *= 200;
            self.addChild(g);
        };
        self.draw();

        self.update = function(message) {
            //if (message.palette) self.draw();
        };

        self.cacheAsBitmap = true;

        return self;
    }

    PerlinView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PerlinView.prototype.constructor = PerlinView;

    return PerlinView;
});