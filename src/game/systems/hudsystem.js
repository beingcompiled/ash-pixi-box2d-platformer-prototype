define([

    'ash',
    'utils/Point',
    'game/graphics/hudview',
    'game/nodes/collision/herocollision'
    // 'game/nodes/hudnode'

], function (

    Ash, 
    Point,
    HudView,
    HeroCollisionNode
    // HudNode

) {
    
    var HudSystem = Ash.System.extend({

        gameState: null,
        game: null,
        stage: null,
        hud: null,
        huds: {},
        hero: null,
        components: { life: ["health", "fails", "teleports"] },

        constructor: function(gameState, stage) {

            this.gameState = gameState;
            this.stage = stage;
            
            return this;
        },

        update: function(time) {

            if (this.heros.head) {
                var hero = this.heros.head;
                for (var component in this.components) {
                    for (var item in this.components[component]) {
                        var id = this.components[component][item];
                        this.huds[id].update(hero[component][id]);
                    }
                }
            }
        },


        /*


        ADD / REMOVE


        */


        addHuds: function(node) {

            for (var component in this.components) {
                for (var i=0; i<this.components[component].length; i++) {

                    var id = this.components[component][i],
                        pos = new Point(10, 80 + (25*i));
                    
                    var hud = new HudView(id);
                    hud.position = pos;

                    this.huds[id] = hud;
                    this.stage.addChild(hud);
                }
            }
        },

        addToEngine: function(game) {

            this.heros = game.getNodeList(HeroCollisionNode);
            this.addHuds();
        },

        removeFromEngine: function(game) {
            this.heros = null;
            //this.stage.removeChild(this.hud);
        }
    });

    return HudSystem;
});