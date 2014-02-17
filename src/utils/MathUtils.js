define(['utils/Point'], function(Point) {

	var MathUtils = {

			// random number between
			rdm : function(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			rdmColor : function() {
				return '0x' + (Math.random().toString(16) + '000000').slice(2, 8);
			},

			//pixels to meters
			p2m : function(n) {
				return n / 30;
			},

			//meters to pixels
			m2p : function(n) {
				return n * 30;
			},

			//degrees to radians
			d2r : function(d) {
				return d * (Math.PI / 180);
			},

			//radians to degrees
			r2d : function(r) {
				return r * (180 / Math.PI);
			},

			getPerc : function(val, start, end) {
				return (val - start) / (end - start);
			},
	
			getPoint : function(perc, start, end) {	
				return ((end - start) * perc) + start;
			},

			distanceTo : function(origPoint, targetPoint) {
				
			    var dx = origPoint.x - targetPoint.x,
			        dy = origPoint.y - targetPoint.y;

			    return Math.sqrt( dx * dx + dy * dy );
			    //Math.sqrt(Math.pow(origX - x, 2) + Math.pow(origY - y, 2));
			},

			angleTo : function(origPoint, targetPoint) {
			    return (
					-(Math.atan2(
						(targetPoint.x - origPoint.x), 
						(targetPoint.y - origPoint.y)
					))
			    );
			},

			hitTest: function(r1, r2) {
				return (r1.x + r1.width >= r2.x) && (r1.x <= r2.x + r2.width) && (r1.y + r1.height >= r2.y) && (r1.y <= r2.y + r2.height);
			},

			getRandomWorldPoint: function(w, h, bool) {

	            var w2 = w * 0.5, h2 = h * 0.5;

	            var pos = new Point(
	                Math.round(_.random(-w2, w2)), 
	                Math.round(_.random(0, h))
	            );

	            // distribute more often near horizon
	            if (bool && Math.random()<0.4) {
	                pos.y = _.random(0, h*0.3);
	            }
	            
	            return pos;
	        }
	};

	return MathUtils;
});