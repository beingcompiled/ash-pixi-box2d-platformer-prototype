define([

    'ash',
    'pixi',
    'brejep/keyboard',
    'utils/Point',
    'utils/MathUtils',

    'game/components/attributes/physics',
    'game/components/attributes/display',
    'game/components/controls/motioncontrols',
    'game/components/attributes/proximity',

    'game/components/entities/generic',
    'game/components/entities/friendly',
    'game/components/entities/enemy',

    'game/components/entities/layer',
    'game/components/attributes/parallax',
    'game/graphics/layers/perlinview',

    'game/components/behaviors/animation',
    'game/components/behaviors/moverandom',
    'game/components/behaviors/predator',

    'game/components/entities/hero',
    'game/graphics/heroview',

    'game/graphics/wallview',
    'game/graphics/blockview'

], function (

    Ash,
    PIXI,
    Keyboard,
    Point,
    MathUtils,

    Physics,
    Display,
    MotionControls,
    Proximity,

    Generic,
    Friendly,
    Enemy,

    PerlinLayer,
    Parallax,
    PerlinView,

    Animation,
    MoveRandom,
    Predator,

    Hero,
    HeroView,
    WallView,
    BlockView

) {

    var EntityCreator = Ash.Class.extend({

        game: null,
        layers: null,
        gameState: null,

        constructor: function(game, layers, gameState) {
            this.game = game;
            this.layers = layers;
            this.gameState = gameState;
        },

        createHero: function(id, pos, fails) {

            var args = {

                id: "hero0",
                
                width: 50,
                height: 50,
                friction: 0.5,
                density: 0.1,
                restitution: 0.5,
                linearDamping: 10,
                fixedRotation: true,

                position: pos,
                maxSpeed: 5,
                jumpTime: 13,
                jumpVelocity: 12,
                
                collisionType: "hero",
                bodyType: "dynamic",
                foot: true
            };

            var hero = new Ash.Entity()
                .add(new Hero())
                .add(new Physics(args))
                .add(new MotionControls(

                    Keyboard.LEFT,
                    Keyboard.RIGHT,
                    Keyboard.UP,                   
                    Keyboard.Q,          
                    args.maxSpeed,                  
                    args.jumpTime,
                    args.jumpVelocity

                ))
                .add(new Display(new HeroView(args, this.gameState)));

            this.game.addEntity(hero);

            return hero;
        },

        createBlock: function(args) {

            var block = new Ash.Entity()
                .add(new Generic())
                .add(new Physics(args))
                .add(new Display(new BlockView(args, this.gameState)));

            this.game.addEntity(block);

            return block;
        },

        createWall: function(args) {

            var wall = new Ash.Entity()
                .add(new Generic())
                .add(new Physics(args))
                .add(new Display(new WallView(args, this.gameState)));

            this.game.addEntity(wall);

            return wall;
        },

        createLayerPerlin: function(id, w, h, order) {

            var perlin = new Ash.Entity()
                .add(new PerlinLayer())
                .add(new Parallax(
                    new PerlinView(id, w, h, this.gameState), 
                    order
                ));

            this.game.addEntity(perlin);

            return perlin;
        },


        /*


        DESTROY


        */


        destroyEntity: function(entity) {
            this.game.removeEntity(entity);
            //physicssystem handles removing physic body
        }
    });

    return EntityCreator;
});
