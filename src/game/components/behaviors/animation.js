define(['ash', 'utils/Point'], function (Ash, Point) {
    
    var Animation = Ash.Class.extend({
        
        constructor: function() {
			this.state = "idle";
			this.counter = 0;
        }
    });

    return Animation;
});