define([
    
    'ash',
    'pixi',
    'utils/Point',
    'utils/MathUtils',
    'game/nodes/collision/herocollision',
    'game/components/controls/cameracontrols',
    'game/graphics/layers/perlinview'

], function(

    Ash,
    PIXI,
    Point,
    MathUtils,
    HeroCollisionNode,
    CameraControls,
    PerlinView

    ) {

    var ParallaxSystem = Ash.System.extend({
    
        gameState: null,
        world: null,
        heros: null,
        hero: null,
        numParallax: null,
        //renderTexture: null,
        parallaxLayers: [],

        constructor: function(world, gameState, numParallax) {

            this.world = world;
            this.sky = null;
            this.clouds = null;
            this.gameState = gameState;
            this.numParallax = numParallax;
            //this.renderTexture = new PIXI.RenderTexture(200, 200);

            return this;
        },

        
        generate: function(w, h, palette) {
            for (var layer in this.parallaxLayers) this.world.removeChild(this.parallaxLayers[layer]);
            for (var i=0; i<this.numParallax; i++) this.addLayer(i, w, h, palette);
        },

        addLayer: function(id, w, h, palette) {

            var args = {
                id: id,
                width: w,
                height: h,
                fill: palette.getRandom(palette.colors)
            }
            var layer = new PerlinView(args, this.gameState);

            this.parallaxLayers[id] = layer;
            this.world.addChildAt(layer, 0);
        },
        
        update: function(time) {

            if (this.hero === null) this.hero = this.heros.head;

            var pos = this.hero.physics.position,
                heroX = MathUtils.m2p(pos.x),
                heroY = MathUtils.m2p(pos.y);

            for (var i=0; i<this.parallaxLayers.length; i++) {
                var v = (i * 0.1) + 0.2; //tweak
                this.parallaxLayers[i].position.x = heroX * v;
                //this.parallaxLayers[i].position.y = heroY * v;
            }
        },


        /*


        ADD / REMOVE


        */


        addToEngine: function(engine) {
            this.heros = engine.getNodeList(HeroCollisionNode);
        },

        removeFromEngine: function(engine) {
            this.hero = null;
            this.world = null;
            this.sky = null;
            this.parallaxLayers = null;
        }
    });
    
    return ParallaxSystem;
});
