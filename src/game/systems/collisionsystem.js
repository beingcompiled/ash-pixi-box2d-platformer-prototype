define([

    'ash',
    'utils/Point',

    'game/nodes/collision/herocollision',
    'game/nodes/collision/genericcollision',
    'game/nodes/collision/enemycollision',
    'game/nodes/collision/projectilecollision'

], function (

    Ash, 
    Point,

    HeroCollisionNode,
    GenericCollisionNode,
    EnemyCollisionNode,
    ProjectileCollisionNode

) {
    
    var CollisionSystem = Ash.System.extend({

        worker: null,
        creator: null,
        heros: null,
        generics: null,
        projectiles: null,
        enemies: null,
        
        nodeLists : {
            "hero"       : "heros",
            "generic"    : "generics",
            "projectile" : "projectiles",
            "enemy"      : "enemies",
            "civilian"   : "generics",
            "portal"     : "generics"
        },

        constructor: function(worker, creator) {

            this.worker = worker;
            this.creator = creator;
            this.toDestroy = [];

            return this;
        },

        update: function(time) {
            for (var entity in this.toDestroy) this.creator.destroyEntity(this.toDestroy[entity]);
            this.toDestroy = [];
        },


        /*


        SPECIFIC COLLISION HANDLERS


        */


        beginContactHero: function(heroData, contactData, position) {
            //console.log('beginContactHero');

            //TO DO: node occassionally missing.
            if (heroData.node && contactData.node) {

                var hero = heroData.node,
                    contact = contactData.node;

                switch (contactData.collisionType) {
                    
                    case "enemy" :
                    
                        break;

                    case "generic" :

                        break;
                }
            }
        },

        onHeroStanding: function(userData) {
            
            //TO DO: hero destroyed before jumping?
            //TO DO: this fires too often
            if (userData.node) {
                var hero = userData.node;
                hero.physics.standing = true;
            }
        },

        onHeroFalling: function(userData) {
            
            //TO DO: hero destroyed before jumping?
            //TO DO: this fires too often
            if (userData.node) {
                var hero = userData.node;
                hero.physics.standing = false;
            }
        },

        /*


        GENERAL


        */


        sortContact: function(response, scope, pos) {

            var fixtureA = response.fixtureA,
                fixtureB = response.fixtureB,
                bodyA = response.bodyA,
                bodyB = response.bodyB,
                //contact position only returned by preSolve listener
                contactPosition = { x: response.posX, y: response.posY };

            bodyA.node = scope.lookupNode(bodyA);
            bodyB.node = scope.lookupNode(bodyB);

            if (response.cmd == "beginContact") {

                if (fixtureA && fixtureA.collisionType == "foot" && bodyA.collisionType == "hero") {
                    scope.onHeroStanding(bodyA); 
                }
                if (fixtureB && fixtureB.collisionType == "foot" && bodyB.collisionType == "hero") {
                   scope.onHeroStanding(bodyB); 
                }

                switch (bodyA.collisionType) {

                    case "hero" :
                        scope.beginContactHero(bodyA, bodyB);
                        break;
                }

                switch (bodyB.collisionType) {

                    case "hero" :
                        scope.beginContactHero(bodyB, bodyA);
                        break;
                }

            } 

            /*            
            else if (response.cmd == "endContact") {
                console.log("endContact");

                if (fixtureA && fixtureA.collisionType == "foot" && bodyA.collisionType == "hero") {
                    if (bodyB.collisionType == "generic") {
                        scope.onHeroFalling(bodyA); 
                    }
                }
                if (fixtureB && fixtureB.collisionType == "foot" && bodyB.collisionType == "hero") {
                    if (bodyA.collisionType == "generic") {
                        scope.onHeroFalling(bodyB); 
                    }
                }
            }
            */
        },

        lookupNode: function(userData) {
            
            var nodeList = this[this.nodeLists[userData.collisionType]];
            for (var node = nodeList.head; node; node = node.next) {
                if (node.physics.id == userData.id) return node;
            }
        },


        /*


        ADD / REMOVE


        */
        

        addToEngine: function(game) {

            //WOW! SCOPE THIS!
            var scope = this;
            this.worker.addEventListener("message", function(e) {
                // console.log("message from worker:", e.data);
                if (e.data.cmd == "beginContact") scope.sortContact(e.data, scope);
                // if (e.data.cmd == "endContact") scope.sortContact(e.data, scope);
            });            

            this.heros = game.getNodeList(HeroCollisionNode);
            this.generics = game.getNodeList(GenericCollisionNode);
            this.projectiles = game.getNodeList(ProjectileCollisionNode);
            this.enemies = game.getNodeList(EnemyCollisionNode);
        },

        removeFromEngine: function (game) {

            this.heros = null;
            this.generics = null;
            this.projectiles = null;
            this.enemies = null;
        }
    });

    return CollisionSystem;
});