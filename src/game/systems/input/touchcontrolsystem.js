  define([

    'ash',
    'utils/Point',
    'utils/MathUtils',
    
    'game/nodes/motioncontrol',
    'game/nodes/bowcontrol',

    'game/graphics/touchview',
    'game/graphics/touchmoveview'

], function (Ash, Point, MathUtils, MotionControlNode, BowControlNode, TouchView, MoveView) {

    var TouchControlSystem = Ash.System.extend({

        nodesMotion: null,
        nodesBow: null,

        stage: null,
        stageWidth: null,
        stageHeight: null,

        moveLtPos: null,
        touchLtDistance: null,
        touchLtAngle: null,
        touchLtView: null,
        moveLtView: null,

        moveRtPos: null,
        touchRtDistance: null,
        touchRtAngle: null,
        touchRtView: null,
        moveRtView: null,
        //sound: false,

        constructor: function (stage, stageWidth, stageHeight) {
            
            this.stage = stage;
            this.stageWidth = stageWidth;
            this.stageHeight = stageHeight;
            //this.sound = sound;
            
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

            var control = node.control;

            if (control.touching) {

                var physics = node.physics,
                    ltPos = this.touchLtView.position,
                    rtPos = this.touchRtView.position,
                    maxSpeed = control.maxSpeed,
                    jumpSpeed = control.jumpSpeed,
                    //jumpVelocity = control.jumpVelocity,
                    vx = 0,//physics.velocity.x,
                    vy = 0,//physics.velocity.y,
                    va = 0;//physics.angularVelocity,
    
                this.touchLtDistance = MathUtils.distanceTo(this.touchLtPos, this.moveLtPos);
                this.touchLtAngle = MathUtils.angleTo(this.touchLtPos, this.moveLtPos);

                var perc = MathUtils.getPerc(this.touchLtDistance, 0, this.touchLtView.radius),
                    speedRun = MathUtils.getPoint(perc, 0, maxSpeed);
                    speedJump = MathUtils.getPoint(perc, 0, jumpSpeed);

                if (this.touchLtDistance > 0) {
                    va = this.touchLtAngle + MathUtils.r2d(44); //TO DO: WTF compensate?!
                    vx = Math.cos(va) * speedRun;
                    vy = Math.sin(va) * speedRun;
                    //vx = (!physics.standing) ? Math.cos(va) * jumpSpeed : Math.cos(va) * maxSpeed;
                }

                //this.touchRtAngle = MathUtils.angleTo(rtPos, this.moveRtPos);
            
                physics.velocity.x = Math.round(vx);
                physics.velocity.y = vy;
                
                this.toggleTouchControls(1);
            
            }  else {

                this.toggleTouchControls(0);
            }   
        },

        /*


        TOUCH HANDLERS


        */

        onTap: function(e, scope) {
            //if (e.target == touchRtView)
            if (e.global.x > this.stageWidth * 0.5 && e.global.y > this.stageHeight * 0.5) {

                // this.touchRtDistance = MathUtils.distanceTo(this.touchRtPos, this.moveRtPos);
                // this.touchRtAngle = MathUtils.angleTo(this.touchRtPos, this.moveRtPos);

                // for(var node = this.nodesMotion.head; node; node = node.next) {
    
                //     var physics = node.physics,
                //         control = node.control,
                //         sound = node.sound,
                //         perc = MathUtils.getPerc(this.touchRtDistance, 0, this.touchRtView.radius),
                //         jumpPower = MathUtils.getPoint(perc, 0, control.jumpVelocity*16);//TO DO: better way to do this

                //     if (physics.standing) {
                //         sound.playRandom = "jump";
                //         physics.velocity.y = -jumpPower;
                //         physics.standing = false;
                //     }
                // }
            }
        },

        onTouchMove: function(e, scope) {

            var touchView,
                moveView,
                radius,
                origPos = new Point(),
                curPos = new Point(e.global.x, e.global.y);

            if (scope.hitTest(curPos, scope.touchLtView)) {

                touchView = scope.touchLtView;
                moveView = scope.moveLtView;
                origPos = touchView.position;
                radius = touchView.radius;

                scope.updateControl(origPos, curPos, radius, moveView, scope, "lt");
            }

            if (scope.hitTest(curPos, scope.touchRtView)) {

                touchView = scope.touchRtView;
                moveView = scope.moveRtView;
                origPos = touchView.position;
                radius = touchView.radius;

                scope.updateControl(origPos, curPos, radius, moveView, scope, "rt");
            }

            for(var node = this.nodesMotion.head; node; node = node.next) {
                node.control.touching = true;
            }
        },

        onTouchEnd: function(e, scope) {

            var touchView,
                moveView,
                radius,
                origPos;

            if (e.global.x < this.stageWidth * 0.5 && e.global.y > this.stageHeight * 0.5) {

                touchView = scope.touchLtView;
                moveView = scope.moveLtView;
                origPos = touchView.position;
                radius = touchView.radius;

                scope.updateControl(origPos, origPos, radius, moveView, scope, "lt");
            }
        },

        updateControl: function(origPos, curPos, radius, moveView, scope, type) {

            var a = MathUtils.angleTo(origPos, curPos) + MathUtils.d2r(90), //TO DO: wtf compensate?!
                d = MathUtils.distanceTo(origPos, curPos),
                newPos = new Point(0,0);

            if (Math.ceil(d) >= radius) {
                newPos.x = Math.cos(a) * radius + origPos.x;
                newPos.y = Math.sin(a) * radius + origPos.y;
            } else {
                newPos.x = curPos.x;
                newPos.y = curPos.y;
            }

            moveView.position = newPos;
            (type == "lt") ? scope.moveLtPos = newPos : scope.moveRtPos = newPos;
        },

        hitTest: function(point, view) {

            var p = new Point(view.position.x, view.position.y),
                d = MathUtils.distanceTo(p, point);

            //extra large radius for superior handling
            if (d < view.radius*2) return true;

            return false;
        },

        toggleTouchControls: function(alpha) {
            if (this.touchLtView.alpha !== alpha) this.touchLtView.alpha = alpha;
            if (this.moveLtView.alpha !== alpha) this.moveLtView.alpha = alpha;
            if (this.touchRtView.alpha !== alpha) this.touchRtView.alpha = alpha;
            if (this.moveRtView.alpha !== alpha) this.moveRtView.alpha = alpha;
        },

        /*


        Add / Remove


        */


        addTouchControl: function() {

            var scope = this,
                onTouchStart = scope.onTouchStart,
                onTouchMove = scope.onTouchMove,
                onTouchEnd = scope.onTouchEnd,
                onTap = scope.onTap;

            //var w = scope.stageWidth,
            var touchLtView = new TouchView(),
                moveLtView = new MoveView(),
                touchRtView = new TouchView(),
                moveRtView = new MoveView();

            var marginX = scope.stageWidth * 0.15,
                marginY = scope.stageHeight * 0.2,
                posLt = new Point(marginX, scope.stageHeight - marginY),
                posRt = new Point(scope.stageWidth - marginX, scope.stageHeight - marginY);

            scope.touchLtPos = posLt;
            scope.moveLtPos = posLt;
            scope.touchRtPos = posRt;
            scope.moveRtPos = posRt;

            touchLtView.position = moveLtView.position = scope.touchLtPos;
            touchRtView.position = moveRtView.position = scope.touchRtPos;
            touchLtView.alpha = 1; //WTF PIXI ?! visible bwoken?
            touchRtView.alpha = 1; //WTF PIXI ?! visible bwoken?

            scope.stage.addChild(touchLtView);
            scope.stage.addChild(moveLtView);
            scope.stage.addChild(touchRtView);
            scope.stage.addChild(moveRtView);

            scope.touchLtView = touchLtView;
            scope.moveLtView = moveLtView;
            scope.touchRtView = touchRtView;
            scope.moveRtView = moveRtView;

            scope.stage.setInteractive(true);
            scope.stage.touchmove = function(e) {
                scope.onTouchMove(e, scope);
            };

            // scope.stage.setInteractive(true);
            // scope.stage.touchstart = function(e) {
            //     scope.onTouchMove(e, scope);
            // };

            scope.stage.touchend = function(e) {
                scope.onTouchEnd(e, scope);
            };

            scope.stage.tap = function(e) {
                scope.onTap(e, scope);
            };

            //WTF PIXI? touchendoutside no work?!!!
        },


        /*


        ADD / REMOVE


        */


        addToEngine: function (engine) {
            this.nodesMotion = engine.getNodeList(MotionControlNode);
            this.nodesBow = engine.getNodeList(BowControlNode);
            this.addTouchControl();
        },

        removeFromEngine: function (engine) {
            this.nodesMotion = null;
            this.nodesBow = null;
        }
    });

    return TouchControlSystem;
});