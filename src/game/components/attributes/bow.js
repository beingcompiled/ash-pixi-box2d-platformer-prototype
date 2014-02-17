define([

    'ash', 
    'utils/Point',

], function (Ash, Point) {

    var Bow = Ash.Class.extend({
        
        constructor: function (power, damage, range, life, stagger, minShotInterval, offset) {
            
            this.power = power;
            this.damage = damage;
            this.range = range;
            this.life = life;
            this.stagger = stagger;

            this.minShotInterval = minShotInterval;
            this.offsetFromParent = offset;

            this.shooting = false;
            this.timeSinceLastShot = 0;
        }
    });

    return Bow;
});
