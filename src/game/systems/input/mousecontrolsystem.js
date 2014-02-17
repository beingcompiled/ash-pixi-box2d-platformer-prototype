  define([

    'ash',
    'utils/Point',
    'utils/MathUtils',
    
    'game/nodes/motioncontrol',
    'game/nodes/bowcontrol'

], function (Ash, Point, MathUtils, MotionControlNode, BowControlNode) {

    var MouseControlSystem = Ash.System.extend({

        nodesMotion: null,
        nodesBow: null,

        stage: null,
        stageWidth: null,
        stageHeight: null,

        constructor: function (stage, stageWidth, stageHeight) {
            
            this.stage = stage;
            this.stageWidth = stageWidth;
            this.stageHeight = stageHeight;
            this.origPos = new Point(0,0);
            this.mousePos = new Point(0,0);
            
            return this;
        },


        /*


        UPDATE


        */


        update: function(time) {
            for(var node = this.nodesMotion.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {

            var control = node.control,
                physics = node.physics;

            //TO DO: this does not work?!!
            //physics.rotation = Math.atan2(this.mousePos.x, this.mousePos.y) * 180 / Math.PI;
        },

        onMouseClick: function(e, scope) {
            for(var node = scope.nodesBow.head; node; node = node.next) {
                node.control.shooting = true;
            }
        },

        onMouseMove: function(e, scope) {
            scope.mousePos = new Point(e.global.x, e.global.y);
        },

        addMouseControl: function() {

            var scope = this;

            this.stage.setInteractive(true);
            this.stage.mousemove = function(e){
               scope.onMouseMove(e, scope);
            };
             
            this.stage.click = function(e){
               scope.onMouseClick(e, scope);
            };
        },

        /*


        ADD / REMOVE


        */

        addToEngine: function (engine) {
            this.nodesMotion = engine.getNodeList(MotionControlNode);
            this.nodesBow = engine.getNodeList(BowControlNode);
            this.addMouseControl();
        },

        removeFromEngine: function (engine) {
            this.nodesMotion = null;
            this.nodesBow = null;
        }
    });

    return MouseControlSystem;
});