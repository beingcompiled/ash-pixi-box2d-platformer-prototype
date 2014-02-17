define([

    'ash',
    'utils/Point',
    'utils/MathUtils',
    'game/nodes/bowcontrol'
    // 'game/nodes/collision/herocollision',
    // 'game/nodes/collision/enemycollision'

], function (
    
    Ash,
    Point,
    MathUtils,
    BowControlNode
    //, HeroCollisionNode
    //, EnemyCollisionNode
    
    ) {
    
    var BowControlSystem = Ash.System.extend({

        //keyPoll: null,
        creator: null,
        //sounds: null,
        // stage: null,
        // sw2: null,
        // sh2: null,
        numProjectiles: 0,

        // touchable: false,
        // touching: false,

        //constructor : function (Keypoll, creator, stage, stageWidth, stageHeight, touchable) {
        constructor : function (creator) {

            //this.keyPoll = keyPoll;
            this.creator = creator;
            //this.sounds = sounds;
            // this.stage = stage;
            // this.sw2 = stageWidth * 0.5;
            // this.sh2 = stageHeight * 0.5;
            // this.touchable = touchable;
            this.numProjectiles = 0;
        },


        /*  


        UPDATES


        */


        updateNode: function (node, time) {

            var control = node.control,
                position = node.physics.position,
                angle = node.physics.angle,
                bow = node.bow;

            // if (this.touching || this.keyPoll.isDown(control.trigger)) bow.shooting = true;
            // console.log(angle);

            bow.shooting = control.shooting;
            bow.timeSinceLastShot += time;

            if (bow.shooting && bow.timeSinceLastShot >= bow.minShotInterval) {    
                this.creator.createUserProjectile(
                    "projectile" + this.numProjectiles,
                    bow, 
                    node.physics.velocity,
                    new Point(MathUtils.m2p(position.x), MathUtils.m2p(position.y)),
                    angle,
                    angle + MathUtils.d2r(90)
                );
                bow.timeSinceLastShot = 0;
                this.numProjectiles++;                
                //this.sounds.playRandom(node, "shoot");
            }

            control.shooting = false;
            //this.touching = false;
        },

        update: function (time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },


        /*


        TOUCH HANDLERS


        */


        /*
        onTap: function(e, scope) {
            //console.log(e.global.x, e.global.y, scope.sw2, scope.sh2);
            //if (e.global.y < scope.sh2) 
            scope.touching = true;
        },
        */


        /* 


        ADD / REMOVE 


        */


        addToEngine: function (engine) {

            var scope = this,
                onTap = this.onTap;

            this.nodeList = engine.getNodeList(BowControlNode);

            // if (this.touchable) {
            //     this.stage.setInteractive(true);
            //     this.stage.tap = function(e) {
            //         onTap(e, scope);
            //     };
            // }
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        }
    });

    return BowControlSystem;
});
