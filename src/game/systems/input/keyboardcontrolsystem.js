define([

    'ash',
    'utils/Point',
    'utils/MathUtils',

    'game/nodes/motioncontrol',
    'game/nodes/bowcontrol',

], function (Ash, Point, MathUtils, MotionControlNode, BowControlNode) {

    var KeyboardControlSystem = Ash.System.extend({

        nodesMovers: null,
        nodesBow: null,
        keyPoll: null,
        keyCode: null,

        constructor: function (keyPoll) {
            
            this.keyPoll = keyPoll;

            return this;
        },


        /*


        UPDATE


        */


        update: function(time) {

            for(var node = this.nodesMovers.head; node; node = node.next) {
                this.updateNode(node, time);
            }
            
            for(var bow = this.nodesBows.head; bow; bow = bow.next) {
                if (this.keyPoll.isDown(bow.control.trigger)) {
                    bow.control.shooting = true;
                }
            }
        },

        updateNode: function (node, time) {

            var control = node.control,
                physics = node.physics,
                maxSpeed = control.maxSpeed,
                jumpSpeed = control.jumpSpeed,
                jump = control.jump,
                jumpTime = control.jumpTime,
                jumpVelocity = control.jumpVelocity,
                vx = 0;//physics.velocity.x,
                vy = 0;//physics.velocity.y;
                //va = physics.angularVelocity
            
            if (this.keyPoll.isDown(control.left)) {
                vx = (!physics.standing) ? -jumpSpeed : -maxSpeed;
                control.touching = false;
            }
            if (this.keyPoll.isDown(control.right)) {
                vx = (!physics.standing) ? jumpSpeed : maxSpeed;
                control.touching = false;
            }
            if (this.keyPoll.isDown(control.jump)) {

                // TO DO: standing boolean is not enough, 
                // need to check if in contact with generic body collisionType
                // box2d "endContact" event fires every tick
                if (physics.standing) {
                    physics.standing = false;
                    control.jumpCounter = jumpTime;
                }
                control.jumpCounter--;
                if (control.jumpCounter > 0) vy = -control.jumpVelocity;
            } else {
                control.jumpCounter = 0;
            }

            //TO DO: quick hack for single key press
            if (this.keyCode == 81) {
                this.keyCode = null;
                control.isTeleporting = true;
            }

            physics.velocity.x = vx;
            physics.velocity.y = vy;
            //physics.angle = physics.angularVelocity = va;
        },


        onKeyDown: function(e, scope) {
            scope.keyCode = e.keyCode;
        },


        /*


        Add / Remove


        */


        addToEngine: function (engine) {
            this.nodesMovers = engine.getNodeList(MotionControlNode);
            this.nodesBows = engine.getNodeList(BowControlNode);
            this.keyPoll.addEventListener("keyup", this.onKeyDown, this);
        },

        removeFromEngine: function (engine) {
            this.nodesMovers = null;
            this.nodesBows = null;
        }
    });

    return KeyboardControlSystem;
});