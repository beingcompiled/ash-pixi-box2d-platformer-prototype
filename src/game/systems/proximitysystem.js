define([
    
    'ash',
    'utils/Point',
    'utils/MathUtils',

    'game/nodes/proximitynode',
    'game/nodes/collision/herocollision'

], function(

    Ash,
    Point,
    MathUtils,

    ProximityNode,
    HeroCollisionNode

    ) {

    var ProximitySystem = Ash.System.extend({

        nodeList: null,
        heros: null,
        hero: null,

        constructor: function() {
            return this;
        },

        update: function(time) {
            if (this.hero == null) this.hero = this.heros.head;
        
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function(node, time) {
            var heroPos = this.hero.physics.position,
                pos = node.physics.position,
                prox = node.proximity,
                display = node.display,
                range = prox.range,
                cullingRange = prox.cullingRange;

            if (heroPos.x > pos.x - range && heroPos.x < pos.x + range) {
                if (heroPos.y > pos.y - range && heroPos.y < pos.y + range) {
                    prox.isInProximity = true;
                    //console.log("ProximitySystem isInProximity:", prox.isInProximity);
                } else {
                    prox.isInProximity = false;
                }
            } else {
                prox.isInProximity = false;
            }

            if (heroPos.x > pos.x - cullingRange && heroPos.x < pos.x + cullingRange) {
                if (heroPos.y > pos.y - cullingRange && heroPos.y < pos.y + cullingRange) {
                    display.view.visible = true;
                } else {
                    display.view.visible = false;
                }
            } else {
                display.view.visible = false;
            }
        },

        addToEngine: function(engine) {
            this.nodeList = engine.getNodeList(ProximityNode);
            this.heros = engine.getNodeList(HeroCollisionNode);
        },

        removeFromEngine: function(engine) {
            this.nodeList = null;
            this.heros = null;
            this.hero = null;
        }
    });

    return ProximitySystem;
});
