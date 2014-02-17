define([
    
    'ash', 
    'game/nodes/movement'

], function(

    Ash, 
    MovementNode

    ) {

    var MovementSystem = Ash.System.extend({

        gameState: null,
        nodeList: null,
        stepRate: null,

        constructor: function(gameState) {
            this.gameState = gameState;
            this.stepRate = gameState.stepRate;
            return this;
        },

        update: function(time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function(node, time) {

            var physics = node.physics,
                vx = physics.velocity.x;
                //vy = physics.velocity.y,
                //va = physics.angularVelocity;

            // var speed = Math.sqrt(vx * vx + vy * vy),
            //     angle = Math.atan2(vy, vx);
            // (speed > fr) ? speed -= fr : speed = 0;
            // speed = (speed * time) * (60/1000);
            // vx = Math.cos(angle) * speed;
            // vy = Math.sin(angle) * speed;

            //physics.velocity.x += vx * time;
            //physics.velocity.y += 0;//vy * time;
            //physics.angularVelocity += va * time;
        },

        addToEngine: function(engine) {
            this.nodeList = engine.getNodeList(MovementNode);
        },

        removeFromEngine: function(engine) {
            this.nodeList = null;
        }
    });

    return MovementSystem;
});
