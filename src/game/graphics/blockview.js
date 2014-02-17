define(['utils/Point', 'utils/MathUtils', 'pixi'], function (Point, MathUtils, PIXI) { 

    "use strict";

    function BlockView(data, gameState) {
    
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
            w5 = w * 0.5,
            h5 = h * 0.5;

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

    BlockView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    BlockView.prototype.constructor = BlockView;

    return BlockView;
});