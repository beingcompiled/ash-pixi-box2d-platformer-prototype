define([
    
    'ash',
    'utils/Point',
    'utils/MathUtils',

    'game/nodes/predatornode',
    'game/nodes/collision/herocollision'

], function(

    Ash,
    Point,
    MathUtils,

    PredatorNode,
    HeroCollisionNode

    ) {

    var PredatorSystem = Ash.System.extend({

        predators: null,
        heros: null,
        homePos: null,

        constructor: function() {
            return this;
        },

        update: function(time) {
            for (var predator = this.predators.head; predator; predator = predator.next) {
                this.updateNode(predator, time);
            }
        },

        updateNode: function(node, time) {

            //TO DO : more robust hero checking
            var hero, heroPos;

            var physics = node.physics,
                predator = node.predator,
                speed = predator.wanderSpeed,
                flying = predator.flying;

            var vx = 0,//physics.velocity.x,
                vy = 0,//physics.velocity.y,
                va = 0;//physics.angularVelocity;

            var curPos = new Point(physics.position.x, physics.position.y),
                homePos = new Point(MathUtils.p2m(predator.homePos.x), MathUtils.p2m(predator.homePos.y)),
                wanderPos = new Point(MathUtils.p2m(predator.wanderPos.x), MathUtils.p2m(predator.wanderPos.y));
        
            if (MathUtils.distanceTo(curPos, homePos) < 1) {
                predator.isHome = true;
            } else if (MathUtils.distanceTo(curPos, wanderPos) < 1) {
                predator.isHome = false;
            }
            predator.targetPos = (!predator.isHome) ? homePos : wanderPos;

            if (this.heros.head) {
                hero = this.heros.head;
                heroPhysics = hero.physics;
                if (MathUtils.distanceTo(curPos, heroPhysics.position) < predator.perception) {
                    speed = predator.maxSpeed;
                    predator.targetPos.x = heroPhysics.position.x;
                    predator.targetPos.y = heroPhysics.position.y - heroPhysics.height*0.25;


                }
            }
            
            va = MathUtils.angleTo(curPos, predator.targetPos) + MathUtils.d2r(90);
            vx = Math.cos(va) * speed;
            vy = (flying) ? Math.sin(va) * speed : 0;

            physics.velocity.x = vx;
            physics.velocity.y = vy;
            //physics.angularVelocity = va;

            // console.log(
            //     "curPos: ", curPos, '\n',
            //     "targetPos: ", predator.targetPos, '\n',
            //     "homePos: ", homePos, '\n',
            //     "wanderPos: ", wanderPos
            // );
        },

        addToEngine: function(engine) {
            this.predators = engine.getNodeList(PredatorNode);
            this.heros = engine.getNodeList(HeroCollisionNode);
            this.hero = this.heros.head;
        },

        removeFromEngine: function(engine) {
            this.predators = null;
            this.heros = null;
            this.hero = null;
        }
    });

    return PredatorSystem;
});
