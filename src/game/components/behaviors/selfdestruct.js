define(['ash', 'utils/Point'], function (Ash, Point) {
    
    var SelfDestruct = Ash.Class.extend({
        
        constructor: function(time) {
			this.lifespan = time;
            this.timeRemaining = time;
        }
    });

    return SelfDestruct;
});
