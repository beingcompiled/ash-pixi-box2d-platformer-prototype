define(['pixi'], function (PIXI) { 

    "use strict";

    function TouchView() {
    
        var self = this;
        PIXI.DisplayObjectContainer.call(self);

        self.id = "touchview";
        self.radius = 80;//width * 0.1;

        var r = self.radius,
            r2 = self.radius * 0.5,
            g = new PIXI.Graphics();

        self.graphics = g;
        self.hitArea = new PIXI.Rectangle(-r, -r, r*2, r*2);

        self.update = function(message) {

            for (var prop in message) self[prop] = message[prop];
            
            g.clear();

            switch (self.state) {

                case "idle" :

                    g.beginFill("0xffffff");
                    g.lineStyle(1, "0x000000", 0.5);
                    g.drawCircle(r, r, r);
                    g.alpha = 0.2;
                    g.position.x = -r2;
                    g.position.y = -r2;
                    g.pivot.x = r2;
                    g.pivot.y = r2;
                    break;
            }
        };

        self.update({state: "idle"});
        self.addChild(g);

        return self;
    }

    TouchView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    TouchView.prototype.constructor = TouchView;

    return TouchView;
});