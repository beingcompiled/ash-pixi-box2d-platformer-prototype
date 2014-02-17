define(['ash', 'utils/Point'], function (Ash, Point) {
    
    var MoveRandom = Ash.Class.extend({
        
        constructor: function(minInterval, maxInterval, minVelocity, maxVelocity) {
			this.minInterval = minInterval;
            this.maxInterval = maxInterval;
            this.minVelocity = minVelocity;
            this.maxVelocity = maxVelocity;
            this.counter = 0;
        }
    });

    return MoveRandom;
});