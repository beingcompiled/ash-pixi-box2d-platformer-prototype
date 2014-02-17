define([
    
    'ash',
    'game/nodes/selfdestructnode'

], function (Ash, SelfDestructNode) {

    var SelfDestructSystem = Ash.System.extend({

        creator: null,
        nodeList: null,

        constructor: function (creator) {
            this.creator = creator;
        },

        update: function(time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {
            var selfdestruct = node.selfdestruct;
            selfdestruct.timeRemaining -= time;
            if (selfdestruct.timeRemaining <= 0) {
                this.creator.destroyEntity(node.entity);
            }
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(SelfDestructNode);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        }
    });

    return SelfDestructSystem;
});
