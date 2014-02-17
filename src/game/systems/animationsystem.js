define([
    
    'ash', 
    'game/nodes/animationnode'

], function(

    Ash, 
    AnimationNode

    ) {

    var AnimationSystem = Ash.System.extend({

        gameState: null,
        nodeList: null,

        constructor: function(gameState) {
            this.gameState = gameState;
            return this;
        },

        update: function(time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function(node, time) {

            var physics = node.physics,
                display = node.display,
                melee = node.melee;

            //TO DO: separate hero system?
            if (display.id == "hero0") {  
                
                if (physics.velocity.x === 0 && physics.velocity.y === 0) {
                    display.update({animation: "idle"});
                } else {
                    display.update({animation: "walk"});
                }

                if (physics.velocity.x > 0 ) {
                    display.update({direction: "rt"});
                } else if (physics.velocity.x < 0 ) {
                    display.update({direction: "lt"});
                }

            } else {

                if (physics.velocity.y === 0) display.update({state: "idle", time: display.countTime});
                if (physics.velocity.y !== 0) display.update({state: "falling", time: display.countTime});
                if (physics.velocity.x !== 0) display.update({animation: "running", time: display.countTime});
            }

            if (display.countTime === 0) display.countTime = display.numCounts;
            display.countTime--;
        },

        addToEngine: function(engine) {
            this.nodeList = engine.getNodeList(AnimationNode);
        },

        removeFromEngine: function(engine) {
            this.nodeList = null;
        }
    });

    return AnimationSystem;
});