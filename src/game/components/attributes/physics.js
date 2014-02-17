define(['ash', 'utils/Point', 'utils/MathUtils'], function (Ash, Point, MathUtils) {

    var Physics = Ash.Class.extend({

		constructor: function(args) {

            this.standing = false;

            this.id = args.id;
            this.userData = {
                id: args.id,
                collisionType: args.collisionType || "generic"
            };

            this.velocity = new Point(0,0);
            this.worldCenter = new Point(0,0);

            this.width = 20;
            this.height = 20;
            this.radius = 10;

            //fixture defaults
            this.density = 1;
            this.restitution = 0;
            this.friction = 0.5;
            this.shape = "polygon";
            
            //body defaults
            this.bodyType = "dynamic";
            this.position = new Point(0, 0);
            this.angle = 0;
            this.angularVelocity = 0;

            this.linearDamping = 0.5;
            this.angularDamping = 0.5;

            this.active = true;
            this.allowSleep = true;
            this.awake = true;
            this.bullet = false;
            this.fixedRotation = true;
            
            this.hitRect = {
                x: args.position.x, 
                y: args.position.y,
                width: args.width,
                height: args.height
            };

            //override above defaults with given arguments
            for (var arg in args) this[arg] = args[arg];
        }
    });

    return Physics;
});
