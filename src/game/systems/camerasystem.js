define([
    
    'ash',
    'utils/Point',
    'utils/MathUtils',
    'brejep/keyboard',

    'game/components/controls/cameracontrols', 
    'game/nodes/collision/herocollision'

], function(

    Ash,
    Point,
    MathUtils,
    Keyboard,

    CameraControls,
    HeroCollisionNode

    ) {

    var CameraSystem = Ash.System.extend({
    
        canvas: null,
        convert: true,
        world: null,
        width: null,
        height: null,
        keyPoll: null,
        keyCode: null,
        controls: null,
        hero: null,
        tweening: false,

        constructor: function(world, gameState, keyPoll, canvas) {

            this.world = world;
            this.width = gameState.width;
            this.height = gameState.height;
            this.canvas = canvas;

            this.zoom = gameState.zoom; 
            this.zoomMin = 0.4;
            this.zoomMax = 2;
            this.zoomSpeed = 0.03;
            this.position = new Point(0,0);

            this.keyPoll = keyPoll;
            this.controls = new CameraControls(
                Keyboard.I,
                Keyboard.O,
                Keyboard.P,
                this.zoom
            );

            this.specialY = 0.7; //0.5 centers perfectly vertical on hero. lower value hero will be lower in viewport.

            return this;
        },

        update: function(time) {

            var scope = this,
                posX = MathUtils.m2p(scope.position.x),
                posY = MathUtils.m2p(scope.position.y);

            //TO DO: delegate this to keyboard control system
            if (this.keyPoll.isDown(this.controls.zoomIn)) this.zoomIn();
            if (this.keyPoll.isDown(this.controls.zoomOut)) this.zoomOut();
            if (this.controls.zoom !== this.zoom) this.zoomTo(this.controls.zoom);
            if (this.hero.head) this.position = this.hero.head.physics.position;

            scope.world.pivot.x = posX - scope.getOffset().x;
            //scope.world.pivot.y = posY - scope.getOffset().y;

            // TO DO: camera restraints

            // TO DO: quick hack for single key press
            if (this.keyCode == 80) { // P (photo)
                this.keyCode = null;
                this.snapShot();
            }
        },


        /*


        METHODS


        */


        zoomIn: function() {
        
            this.zoom = this.zoom + this.zoomSpeed;
            if (this.zoom < this.zoomMin) this.zoom = this.zoomMin;
            if (this.zoom > this.zoomMax) this.zoom = this.zoomMax;
            this.world.scale = new Point(this.zoom, this.zoom);
        },

        zoomOut: function() {

            this.zoom = this.zoom - this.zoomSpeed;
            if (this.zoom < this.zoomMin) this.zoom = this.zoomMin;
            if (this.zoom > this.zoomMax) this.zoom = this.zoomMax;
            this.world.scale = new Point(this.zoom, this.zoom);
        },

        zoomTo: function(n) {
            if (n > this.zoomMin && n < this.zoomMax) {
                this.world.scale = new Point(this.zoom, this.zoom);
            }
        },

        snapShot: function() {

            var image = new Image();
            image.src = this.canvas.toDataURL('image/png');
            var url = image.getAttribute('src');
            window.open(url, 'image',' width=' + this.width + ', height=' + this.height);
        },

        // moveTo: function(pos) {
        //     follow = null;
        //     position = pos;
        // },

        /*


        UTIL


        */

        getOffset: function() {
            return new Point(
                (this.width * 0.5) / this.world.scale.x,
                (this.height * this.specialY) / this.world.scale.y
            );
        },


        onKeyUp: function(e, scope) {
            scope.keyCode = e.keyCode;
        },


        /*


        ADD / REMOVE


        */


        addToEngine: function(engine) {
            this.hero = engine.getNodeList(HeroCollisionNode);
            this.world.scale.x = this.zoom;
            this.world.scale.y = this.zoom;

            this.keyPoll.addEventListener("keyup", this.onKeyUp, this);
        },

        removeFromEngine: function(engine) {
            this.hero = null;
            this.world = null;
        }
    });

    return CameraSystem;
});
