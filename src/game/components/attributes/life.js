define(['ash', 'utils/Point',], function (Ash, Point) {
    
    var Life = Ash.Class.extend({
        
        constructor: function(healthMax, civilians, fails) {

            this.healthMax = healthMax;
            this.health = healthMax;
            this.civilians = civilians;
            this.teleports = 0;
            this.kills = 0;
            this.fails = fails;
        }
    });

    return Life;
});