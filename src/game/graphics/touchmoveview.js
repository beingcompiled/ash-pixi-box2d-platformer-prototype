define(['pixi'], function (PIXI) { 

    "use strict";

    function TouchMoveView() {
    
        var self = this;
        PIXI.DisplayObjectContainer.call(self);

        self.id = "touchmoveview";
        self.radius = 35;//stageWidth * 0.035;

        self.update = function(message) {

            for (var prop in message) self[prop] = message[prop];
            
            g.clear();

            switch (self.state) {

                case "idle" :

                    g.beginFill("0x000000");
                    g.lineStyle(1, "0xffffff", 0.5);
                    g.drawCircle(r, r, r);
                    g.alpha = 0.2;
                    g.position.x = -r2;
                    g.position.y = -r2;
                    g.pivot.x = r2;
                    g.pivot.y = r2;
                    break;
            }
        };

        var r = self.radius,
            r2 = self.radius * 0.5,
            g = new PIXI.Graphics();

        self.update({state: "idle"});
        self.addChild(g);

        return self;
    }

    TouchMoveView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    TouchMoveView.prototype.constructor = TouchMoveView;

    return TouchMoveView;
});