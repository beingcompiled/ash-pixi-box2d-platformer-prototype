define(['ash', 'utils/Point'], function (Ash, Point) {
    
    var AutoJump = Ash.Class.extend({
        
        constructor: function(minInterval, maxInterval, minJumpVelocity, maxJumpVelocity) {
			this.minInterval = minInterval;
            this.maxInterval = maxInterval;
            this.minJumpVelocity = minJumpVelocity;
            this.maxJumpVelocity = maxJumpVelocity;
            this.counter = this.maxInterval;
        }
    });

    return AutoJump;
});