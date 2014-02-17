define(['utils/Point', 'utils/MathUtils', 'pixi'], function (Point, MathUtils, PIXI) { 

    "use strict";

    function HeroView(data, gameState) {
    
        var self = this;
        PIXI.DisplayObjectContainer.call(self);

        self.id = data.id;
        self.width = data.width;
        self.height = data.height;
        self.gameState = gameState;

        self.state = null; 
        self.time = null; 
        self.animation = null;

        var w = self.width,
            h = self.height,
            w5 = self.width * 0.5,
            h5 = self.height * 0.5;

        var parts = {};

        this.position.x = w5;
        this.position.y = h5;

        self.update = function() {

        };
 
         //DRAW
        self.draw = function() {

            var area = new PIXI.Graphics();
            area.beginFill("0xff00ff", 0.25);
            area.drawRect(-w5, -h5, w, h)
            self.addChild(area);

            // var s = new PIXI.Graphics();
            // s.beginFill(data.fill);
            // s.drawRect(-w5, -h5, w, h);
            // this.addChild(s);

            var reg = new PIXI.Graphics();
            reg.beginFill("0xff00ff", 0.25);
            reg.drawCircle(0,0,10);
            self.addChild(reg);     
        };
        self.draw();

        self.update({state: "idle"});

        return self;
    }

    HeroView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    HeroView.prototype.constructor = HeroView;

    return HeroView;
});