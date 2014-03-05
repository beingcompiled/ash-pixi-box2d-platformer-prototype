define([

    'ash',
    'brejep/tickprovider',
    'brejep/keypoll',
    'underscore',
    'pixi',

    'game/core/gamemanager',
    'game/core/systempriorities',
    'game/core/entitycreator',
    'game/core/gamestate',

    'game/systems/physicssystem-box2D',
    'game/systems/camerasystem',
    'game/systems/soundsystem',
    'game/systems/palettesystem',
    'game/systems/movementsystem',
    'game/systems/collisionsystem',
    'game/systems/rendersystem-pixi',
    'game/systems/animationsystem',
    'game/systems/parallaxsystem',
    'game/systems/proximitysystem',
    'game/systems/moverandomsystem',
    'game/systems/predatorsystem',

    'game/systems/input/keyboardcontrolsystem',
    'game/systems/input/touchcontrolsystem',
    'game/systems/input/mousecontrolsystem'

], function (

    Ash,
    TickProvider,
    KeyPoll,
    _,
    PIXI,

    GameManager,
    SystemPriorities,
    EntityCreator,
    GameState,
    
    PhysicsSystem,
    CameraSystem,
    SoundSystem,
    PaletteSystem,
    MovementSystem,
    CollisionSystem,
    RenderSystem,
    AnimationSystem,
    ParallaxSystem,
    ProximitySystem,
    MoveRandomSystem,
    PredatorSystem,

    KeyboardControlSystem,
    TouchControlSystem,
    MouseControlSystem

) {

    var Game = Ash.Class.extend({

        width: 0,
        height: 0,
        engine: null,
        gameState: null,
        tickProvider: null,
        stage: null,
        assets : [],

        constructor: function (html, canvas, stats, touchable, soundSupport) {

            var isRetina = (window.devicePixelRatio > 1);
            if(isRetina) {
                var w = canvas.width, h = canvas.height;
                canvas.width = w * window.devicePixelRatio;
                canvas.height = h * window.devicePixelRatio;
                canvas.style.width = w + "px";
                canvas.style.height = h + "px";
            }

            this.width = canvas.width;
            this.height = canvas.height;

            this.engine = new Ash.Engine();
            this.gameState = new GameState(this.width, this.height);
            this.gameState.touchable = touchable;
            this.gameState.soundSupport = soundSupport;
            this.gameState.isRetina = isRetina;
            this.gameState.zoom = (this.gameState.isRetina) ? 0.7 : 0.3;
            this.gameState.cullingRange = 100;
            

            /*


            PIXI DEPENDENCIES


            */


            this.stage = new PIXI.Stage(0xffffff);
            
            var renderer = new PIXI.autoDetectRenderer(this.width, this.height, canvas), 
                worldView = new PIXI.DisplayObjectContainer(),
                layers = new PIXI.DisplayObjectContainer();

            html.appendChild(renderer.view);

            /*


            WEB WORKER: PHYSICS


            */

            //TO DO: url relative to dev / deploy
            var physicsWorker = new Worker("./src/game/core/worker-box2D.js?bust=" + Math.random());
            //var physicsWorker = new Worker("./bin/game/core/worker-box2D.js?bust=" + Math.random());
            physicsWorker.addEventListener('error', function(e) {
                console.log(
                    'worker error: ', e.filename, 
                    'line: ', e.lineno, 
                    'details: ', e.message
                );
            });


            /*


            PERFORMANCE MODES


            */


            // TO DO: lower rate reduces some temporal aliasing
            // recommended: 1/30, 1/45 or 1/300 for mobile?
            this.gameState.highPerformance = (renderer.gl) ? true : false;
            this.gameState.stepRate = (!this.gameState.highPerformance) ? 45 : 60;
            console.log("high performance:", this.gameState.highPerformance, "physics steprate:", this.gameState.stepRate, renderer);


            /*


            SYSTEMS


            */


            var creator = new EntityCreator(this.engine, layers, this.gameState);
            
            var numParallax = _.random(1,2),
                parallaxSystem = new ParallaxSystem(worldView, this.gameState, numParallax);
            
            this.engine.addSystem(parallaxSystem, SystemPriorities.update);

            this.engine.addSystem(
                new GameManager(this.gameState, creator, parallaxSystem),
                SystemPriorities.preUpdate
            );
            this.engine.addSystem(
                new PhysicsSystem(physicsWorker, this.gameState),
                SystemPriorities.physics
            );
            this.engine.addSystem(
                new MovementSystem(this.gameState),
                SystemPriorities.move
            );
            this.engine.addSystem(
                new MoveRandomSystem(this.gameState),
                SystemPriorities.move
            );
            this.engine.addSystem(
                new AnimationSystem(),
                SystemPriorities.update
            );
            this.engine.addSystem(
                new PredatorSystem(this.gameState),
                SystemPriorities.move
            );
            this.engine.addSystem(
                new ProximitySystem(),
                SystemPriorities.update
            );
            this.engine.addSystem(
                new CameraSystem(worldView, this.gameState, KeyPoll, canvas),
                SystemPriorities.render
            );
            this.engine.addSystem(
                new RenderSystem(this.stage, renderer, worldView, layers, this.gameState, numParallax),
                SystemPriorities.render
            );
            this.engine.addSystem(
                new CollisionSystem(physicsWorker, creator),
                SystemPriorities.resolveCollisions
            );

            /*
            if (this.gameState.soundSupport) {
                this.engine.addSystem(
                    new MusicSystem(this.gameState),
                    SystemPriorities.update
                );
            }
            */
            

            /* 


            DEVICE DEPENDENT SYSTEMS 


            */
            
            if (this.gameState.touchable) {
                this.engine.addSystem(
                    new TouchControlSystem(this.stage, this.width, this.height),
                    SystemPriorities.motionControl
                );
            } else {
                this.engine.addSystem(
                    new KeyboardControlSystem(KeyPoll, this.gameState),
                    SystemPriorities.motionControl
                );
            }
            
            //this.tickProvider = new TickProvider(stats);
            this.tickProvider = new TickProvider();
        },

        stop : function(params) {
            console.log("stop");

            var tickprovider = params[0],
                engine = params[1],
                update = params[2];

            tickprovider.remove(update, engine);
            tickprovider.stop();
        },

        start : function() {
            var scope = this;

            if (this.assets.length > 0) {
                var pixiLoader = new PIXI.AssetLoader(this.assets);
                //pixiLoader.onProgress = function() {};
                pixiLoader.onComplete = function() { scope.onAssetsLoadedComplete(scope); };
                pixiLoader.load();
            } else {
                scope.onAssetsLoadedComplete(scope);
            }
        },

        onAssetsLoadedComplete: function(scope) {

            // scope.gameState.level = 0;
            // scope.gameState.lives = 3;
            // scope.gameState.points = 0;

            scope.tickProvider.add(scope.engine.update, scope.engine);
            scope.tickProvider.start();

            //setTimeout(this.stop, 5000, [this.tickProvider, this.engine, this.engine.update]);
        }
    });

    return Game;
});