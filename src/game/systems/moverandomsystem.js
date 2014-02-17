define([
    
    'ash',
    'utils/Point',
    'utils/MathUtils',
    'game/nodes/MoveRandomNode'

], function(

    Ash,
    Point,
    MathUtils,
    MoveRandomNode

    ) {

    var MoveRandomSystem = Ash.System.extend({

        nodes: null,

        constructor: function() {
            return this;
        },

        update: function(time) {
            for (var node = this.nodes.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function(node, time) {

            var physics = node.physics,
                moveRandom = node.moveRandom;

            //console.log(moveRandom);

            moveRandom.counter--;
            if (moveRandom.counter < 0) {
                var vel = _.random(moveRandom.minVelocity, moveRandom.maxVelocity);
                (Math.random() > 0.5) ? physics.velocity.x = vel : physics.velocity.x = -vel;
                (Math.random() > 0.5) ? physics.velocity.y = vel : physics.velocity.y = -vel;
                moveRandom.counter = _.random(moveRandom.minInterval, moveRandom.maxInterval);
            }
        },

        addToEngine: function(engine) {
            this.nodes = engine.getNodeList(MoveRandomNode);
        },

        removeFromEngine: function(engine) {
            this.nodes = null; 
        }
    });

    return MoveRandomSystem;
});
