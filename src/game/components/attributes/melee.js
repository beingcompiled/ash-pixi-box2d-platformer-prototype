define(['ash', 'utils/Point',], function (Ash, Point) {
    
    var Melee = Ash.Class.extend({
        
        constructor: function(damage, stagger, attack) {

            this.damage = damage;
            this.stagger = stagger;
			
			this.attackTime = 25;
			this.attackCounter = this.attackTime;
            this.attackJump = 30;
            this.direction = "RT"; //"LT"

            //input
			this.attack = attack;
        }
    });

    return Melee;
});