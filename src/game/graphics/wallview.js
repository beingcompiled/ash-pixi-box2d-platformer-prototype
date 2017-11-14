define(['utils/MathUtils', 'pixi'], function(MathUtils, PIXI) { 

    "use strict";

    function WallView(args, gameState) {        
    
        var self = this;
        PIXI.DisplayObjectContainer.call(self);

        // self.id = args.id;
        // self.width = args.width;
        // self.height = args.height; 

        for (var prop in args) self[prop] = args[prop];

        self.state = null; 
        self.gameState = gameState;

        var w = args.width,
            h = args.height,
            w5 = args.width * 0.5,
            h5 = args.height * 0.5,
            g = new PIXI.Graphics();

        //g.position.x = w5;
        //g.position.y = h5;
        //g.pivot.x = w5;
        //g.pivot.y = h5;

        self.build= function(message) {

            for (var prop in message) self[prop] = message[prop];
            
            g.clear();

            switch (self.state) {
                case "idle" :
                    g.beginFill(args.fill);
                    g.drawRect(-w5, -h5, w, h); 
                    //g.drawRect(0, 0, w, h);
                    break;
            }
        };

        self.update = function() {

        };

        self.build({state: "idle"});
        self.addChild(g);
    }

    WallView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    WallView.prototype.constructor = WallView;

    return WallView;
});