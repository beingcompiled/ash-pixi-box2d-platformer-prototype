define([

    'ash',
    'utils/Point',
    'utils/MathUtils',
    'utils/PaletteGenerator',
    'game/nodes/collision/herocollision',
    'game/nodes/collision/genericcollision'
    
], function (

        Ash,
        Point,
        MathUtils,
        PaletteGenerator,
        HeroCollisionNode,
        GenericCollisionNode

    ) {

    var GameManager = Ash.System.extend({

        parallaxSystem: null,

        gameState: null,
        creator: null,
        heros: null,
        hero: null,
        generics: null,
        enemies: null,

        worldWidth: null,
        worldHeight: null,
        w2: null,
        h2: null,

        spawned: false,
        heroFails: -1,

        world: null,

        constructor: function (gameState, creator, parallaxSystem) {

            this.gameState = gameState;
            this.creator = creator;
            this.parallaxSystem = parallaxSystem;

            this.gameState.worldWidth = 20000,
            this.gameState.worldHeight = 1200;
        },

        update: function(time) {
            
            if (this.heros.head === null) {
                this.destroyAll();
                this.spawnWorld();
                this.heroFails++;
                this.creator.createHero("hero" + 0, new Point(0, 0), this.heroFails);//this.getRandomWorldPoint());////new Point(_.random(-this.w2*0.8, this.w2), -this.h2*0.9)
                this.hero = this.heros.head;
                this.spawned = false;
            }
            
            if(!this.spawned) {
                this.spawned = true;

                var w = this.gameState.worldWidth,
                    h = this.gameState.worldHeight;

                // floor
                args = {
                    id: "floor", 
                    position: new Point(0, h*1.3),
                    width: this.gameState.worldWidth, 
                    height: 400, 
                    bodyType: "static", 
                    angle: 0,
                    visible: true
                };
                this.creator.createWall(args);

                // wall left
                args = {
                    id: "wallleft", 
                    position: new Point(-w*0.5, h*0.5),
                    width: 400, 
                    height: h,
                    bodyType: "static", 
                    angle: 0,
                    visible: true
                };
                this.creator.createWall(args);

                // wall right
                args = {
                    id: "wallright" + 2, 
                    position: new Point(w*0.5, h*0.5),
                    width: 400, 
                    height: h,
                    bodyType: "static", 
                    angle: 0,
                    visible: true
                };
                this.creator.createWall(args);

                // random walls
                for (var i=0; i<40; i++) {
                    args = {
                        id: "wall" + i, 
                        position: MathUtils.getRandomWorldPoint(w,h),
                        width: _.random(300, 1000), 
                        height: _.random(300, 500),
                        bodyType: "static",
                        density: 1
                    };
                    this.creator.createWall(args);
                }

                for (var i = 0; i < 6; i++) {
                    args = {
                        id: "block" + i, 
                        position: MathUtils.getRandomWorldPoint(w,h),
                        width: _.random(50, 100), 
                        height: _.random(100, 300),
                        bodyType: "dynamic",
                        density: 0,
                        friction: 0
                    };
                    this.creator.createBlock(args);
                }
            }
        },

        spawnWorld: function() {

            var w = this.gameState.worldWidth,
                h = this.gameState.worldHeight;

            this.w2 = this.gameState.worldWidth * 0.5,
            this.h2 = this.gameState.worldHeight * 0.5;

            var style = PaletteGenerator.getRandom(),
                palette = PaletteGenerator.generate(style, 0);

            this.parallaxSystem.generate(w, h, palette);
        },

        
        /*


        ADD / REMOVE


        */


        destroyAll: function() {
            for (node = this.generics.head; node; node = node.next) {
                this.creator.destroyEntity(node.entity);
            }
        },

        addToEngine: function (game) {
            this.heros = game.getNodeList(HeroCollisionNode);
            this.generics = game.getNodeList(GenericCollisionNode);
        },

        removeFromEngine: function (game) {
            this.heros = null;
            this.generics = null;
        }
    });

    return GameManager;
});
