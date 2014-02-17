define(['pixi'], function(PIXI) {

	var draw = {
		
		//graphics, {radius, radius, radius}
		circle: function (g, args) {
			g.drawCircle(args.radius, args.radius, args.radius);
		},

		ellipse: function (g, args) {
			g.drawEllipse(0, 0, args.width, args.height);
		},

		rect: function (g, args) {
			g.drawRect(0, 0, args.width, args.height);
		},

		roundRect : function (g, args) {
			g.drawRoundRect(0, 0, args.width, args.height, args.radius);
		},

		//graphics, {points}
		polygon : function(g, args) {

			var points = args.points;

			g.moveTo(points[0].x, points[0].y);
			for (var i=0; i<points.length; i++) {
				g.lineTo(points[i].x, points[i].y);
			}
			g.lineTo(
				points[0].x, 
				points[0].y
			);
		},

		//graphics, {radius, points}
		roundPoly : function(g, args) {

			var points = args.points;
				r = args.radius;

			g.moveTo( points[0].x, points[0].y );
			g.curveTo( points[1].x * 0.5, -r, points[1].x, points[1].y );
			g.lineTo( points[2].x, points[2].y );	
			g.curveTo( points[1].x * 0.5, points[3].y + r, points[3].x, points[3].y );
			g.lineTo( points[0].x, points[0].y );
		},

		//graphics, {x, y, r, arc}
		semiCircle: function(g, args) {

			var x = args.x,
				y = args.y,
				r = args.r,
				arc = args.arc,
				c1 = r * (Math.SQRT2 - 1),
			    c2 = r * Math.SQRT2 / 2;

			if (arc == -1) {
			    g.moveTo(x+r,y);
			    g.curveTo(x+r,y+c1,x+c2,y+c2);
			    g.curveTo(x+c1,y+r,x,y+r);
			    g.curveTo(x-c1,y+r,x-c2,y+c2);
			    g.curveTo(x-r,y+c1,x-r,y);
				g.lineTo(x+r,y);
			} else {
				g.lineTo((-r), y);
				g.curveTo(x-r,y-c1,x-c2,y-c2);
				g.curveTo(x-c1,y-r,x,y-r);
				g.curveTo(x+c1,y-r,x+c2,y-c2);
				g.curveTo(x+r,y-c1,x+r,y);
				g.lineTo(-r,y);
			}

			    /*
			    s.moveTo(-w*0.5, 0);
                s.lineTo(-w*0.46, -w*0.15);
                s.lineTo(-w*0.4, -w*0.25);
                s.lineTo(-w*0.33, -w*0.33);
                s.lineTo(-w*0.25, -w*0.4);
                s.lineTo(-w*0.1,-w*0.45);
                s.lineTo(w*0.1, -w*0.45);
                s.lineTo(w*0.25, -w*0.4);
                s.lineTo(w*0.33, -w*0.33);
                s.lineTo(w*0.4, -w*0.25);
                s.lineTo(w*0.46, -w*0.15);
                s.lineTo(w*0.5, 0);
               */
		},

		drawHexagon : function(g, numSides, size) {

			var Xcenter = 25,
				Ycenter = 25;

			g.moveTo(
				Xcenter + size * Math.cos(0), 
				Ycenter + size * Math.sin(0)
			);          

			for (var i=1; i<=numSides; i++) {
			    g.lineTo(
					Xcenter + size * Math.cos(i * 2 * Math.PI / numSides), 
					Ycenter + size * Math.sin(i * 2 * Math.PI / numSides)
			    );
			}
			return g;
		}
	};

	return {

		//type, regX, regY, fill, stroke, 
		//optional args array: points, radius
		draw : function(data) {

			//console.log(data);

			var c = new PIXI.DisplayObjectContainer(),
				s = new PIXI.Graphics();

			s.beginFill(data.fill);
			s.lineStyle(1, data.stroke);

			draw[data.s](s, data.args);

   //          c.position.x = data.x;
   //          c.position.y = data.y;
			// c.regX = data.regX;
			// c.regY = data.regY;
			// c.rotation = data.rotation;
			//c.visible = data.visible;

			c.addChild(s);

			return c;
		},

		setLuminance : function(hex, percent){
		    // strip the leading # if it's there
		    hex = hex.replace(/^\s*#|\s*$/g, '');

		    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
		    if(hex.length == 3){
		        hex = hex.replace(/(.)/g, '$1$1');
		    }

		    var r = parseInt(hex.substr(0, 2), 16),
		        g = parseInt(hex.substr(2, 2), 16),
		        b = parseInt(hex.substr(4, 2), 16);

		    return '0x' +
		       ((0|(1<<8) + r + (256 - r) * percent).toString(16)).substr(1) +
		       ((0|(1<<8) + g + (256 - g) * percent).toString(16)).substr(1) +
		       ((0|(1<<8) + b + (256 - b) * percent).toString(16)).substr(1) +
		       hex[6] + hex[7];
		},
		
		// setLuminance : function(hex, lum) {
		// 	// validate hex string
		// 	hex = String(hex).replace(/[^0-9a-f]/gi, '');
		// 	if (hex.length < 6) {
		// 		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		// 	}
		// 	lum = lum || 0;
		// 	// convert to decimal and change luminosity
		// 	var rgb = "#", c, i;
		// 	for (i = 0; i < 3; i++) {
		// 		c = parseInt(hex.substr(i*2,2), 16);
		// 		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		// 		rgb += ("00"+c).substr(c.length);
		// 	}
		// 	return rgb;
		// },

		getLuminance : function(_hex) {

			var hex = _hex.substring(1);      // strip #
			if (hex.length < 6) {
				hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
			}
			var rgb = parseInt(hex, 16);   // convert rrggbb to decimal
			var r = (rgb >> 16) & 0xff;  // extract red
			var g = (rgb >>  8) & 0xff;  // extract green
			var b = (rgb >>  0) & 0xff;  // extract blue

			var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

			return luma;
		}
	};
});


		/*
		//centerX, centerY, minRad, maxRad, phase
		drawIrregularCircle : function(shape, size, colorFill, colorStroke) {
			var point;
			var rad, theta;
			var twoPi = 2*Math.PI;
			var x0,y0;
			var minRad = size - 10;
			var maxRad = size + 10;
			var phase = size;
			
			//generate the random function that will be used to vary the radius, 9 iterations of subdivision
			var pointList = this.setLinePoints(8);
			point = pointList.first;
			theta = phase;
			rad = minRad + point.y*(maxRad - minRad);
			x0 = 0 + rad*Math.cos(theta);
			y0 = 0 + rad*Math.sin(theta);
			shape.graphics.beginFill(colorFill).beginStroke(colorStroke).lineTo(x0, y0);
			while (point.next != null) {
				point = point.next;
				theta = twoPi*point.x + phase;
				rad = minRad + point.y*(maxRad - minRad);
				x0 = 0 + rad*Math.cos(theta);
				y0 = 0 + rad*Math.sin(theta);
				shape.graphics.lineTo(x0, y0);
			}
		}
		*/

		/*
		function setLinePoints(iterations) {

			var pointList = {};
			pointList.first = {x:0, y:1};
			var lastPoint = {x:1, y:1};
			var minY = 1;
			var maxY = 1;
			var point;
			var nextPoint;
			var dx, newX, newY;

			pointList.first.next = lastPoint;
			for (var i = 0; i < iterations; i++) {
				point = pointList.first;
				while (point.next != null) {
					nextPoint = point.next;
					
					dx = nextPoint.x - point.x;
					newX = 0.5*(point.x + nextPoint.x);
					newY = 0.5*(point.y + nextPoint.y);
					newY += dx*(Math.random()*2 - 1);
					
					var newPoint = {x:newX, y:newY};
					
					//min, max
					if (newY < minY) {
						minY = newY;
					}
					else if (newY > maxY) {
						maxY = newY;
					}
					
					//put between points
					newPoint.next = nextPoint;
					point.next = newPoint;
					
					point = nextPoint;
				}
			}
				
			//normalize to values between 0 and 1
			if (maxY != minY) {
				var normalizeRate = 1/(maxY - minY);
				point = pointList.first;
				while (point != null) {
					point.y = normalizeRate*(point.y - minY);
					point = point.next;
				}
			}
			//unlikely that max = min, but could happen if using zero iterations. 
			//In this case, set all points equal to 1.
			else {
				point = pointList.first;
				while (point != null) {
					point.y = 1;
					point = point.next;
				}
			}
				
			return pointList;
		}
		*/