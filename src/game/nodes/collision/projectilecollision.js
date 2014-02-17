define([
    
    'ash', 
    'game/components/attributes/projectile', 
    'game/components/attributes/physics'

], function (Ash, Projectile, Physics) {
    
    var ProjectileCollision = Ash.Node.create({
        projectile : Projectile,
        physics : Physics
    });

    return ProjectileCollision;
});