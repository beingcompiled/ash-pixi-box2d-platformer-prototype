define([
    
    'ash',
    'utils/Point',
    'utils/MathUtils',
    'game/nodes/autojumpnode'

], function(

    Ash,
    Point,
    MathUtils,
    AutoJumpNode

    ) {

    var AutoJumpSystem = Ash.System.extend({

        jumpers: null,

        constructor: function() {
            return this;
        },

        update: function(time) {
            for (var node = this.jumpers.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function(node, time) {

            var physics = node.physics,
                autojump = node.autojump;

            autojump.counter--;
            if (autojump.counter < 0) {
                physics.velocity.y -= _.random(autojump.minJumpVelocity, autojump.maxJumpVelocity);
                autojump.counter = _.random(autojump.minInterval, autojump.maxInterval);
            }
        },

        addToEngine: function(engine) {
            this.jumpers = engine.getNodeList(AutoJumpNode);
        },

        removeFromEngine: function(engine) {
            this.jumpers = null; 
        }
    });

    return AutoJumpSystem;
});
