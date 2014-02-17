define(['ash'], function (Ash) {

    var Projectile = Ash.Class.extend({
    
        constructor: function (damage, range, stagger) {
			this.damage = damage;
            this.range = range;
            this.stagger = stagger;
        }
    });

    return Projectile;
});
