define([

    'ash', 
    'game/nodes/livingnode',
    'utils/Point'

], function (

    Ash,
    LifeNode,
    Point

) {
    
    var LifeSystem = Ash.System.extend({

        creator: null,
        nodes: null,
        //sounds: null,

        constructor: function(creator) {
            
            this.creator = creator;
            //this.sounds = sounds;

            return this;
        },


        /*


        UPDATE


        */
        

        update: function(time) {
            for(var node = this.nodes.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {
            var health = node.life.health;
            if (health <= 0) {
                //this.sounds.playRandom(node, "explosion");
                for (var i=0; i<_.random(2, 4); i++) this.creator.createDetritus("detritus" + Math.random(), node.physics, node.display.color);
                this.creator.destroyEntity(node.entity);
            }
        },


        /*


        UTILS


        */
        

        addToEngine: function(engine) {
            this.nodes = engine.getNodeList(LifeNode);
        },

        removeFromEngine: function(game) {
            this.nodes = null;
        }
    });

    return LifeSystem;
});
