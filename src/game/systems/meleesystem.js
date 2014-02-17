define([
    
    'ash',
    'game/nodes/meleenode'

], function (Ash, MeleeNode) {

    var MeleeSystem = Ash.System.extend({

        keypoll: null,
        nodeList: null,

        constructor: function (keypoll) {
            this.keypoll = keypoll;
        },

        update: function(time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {

            var melee = node.melee,
                physics = node.physics,
                sound = node.sound;

            if (this.keypoll.isDown(melee.attack)) {
                if (melee.attackCounter == melee.attackTime) {
                    sound.playRandom = "hit";
                    physics.velocity.x -= 0;
                    physics.velocity.y -= melee.attackJump;
                    melee.attackCounter--;
                }
            }
            if (melee.attackCounter < melee.attackTime) {
                melee.attackCounter = (melee.attackCounter === 0 ) ? melee.attackTime : melee.attackCounter-1;
            }
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(MeleeNode);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        }
    });

    return MeleeSystem;
});