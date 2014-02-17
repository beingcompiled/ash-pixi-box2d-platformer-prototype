define(['ash', 'utils/Point'], function (Ash, Point) {
    
    var Proximity = Ash.Class.extend({
        
        constructor: function(cullingRange, range) {
			
			this.cullingRange = cullingRange;
			this.range = range;
			this.isInProximity = false;
        }
    });

    return Proximity;
});