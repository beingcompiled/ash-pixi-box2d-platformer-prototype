define([], function() {
	    
	return {
		
		//eg. world.HEIGHT, MathUtils.rdm(2,8), MathUtils.rdm(1,2)
		getPerlinNoise1D : function(len, octaves, decay) {
			
				var graph = [],
					totalGraph = getNoiseFunctionResults(len, 1, 1),
					totalAmplitude = 1; //used to normalize amplitude

				for(var o=1; o<=octaves; o++) {
			        if(Math.pow(2,o) < len) { //cannot have frequency > len
						graph = getNoiseFunctionResults(len, Math.pow(decay,o)/*amplitude*/, Math.pow(2,o)/*frequency*/);
			            totalAmplitude+=Math.pow(decay,o);
			            for(var g=0; g<graph.length; g++){
			                //add the graphs together by shifting them so they are centred on y=0 (subtract their amplitude/2)
			                totalGraph[g] += graph[g];
			            }
			        }
			    }

			    //normalize values in totalGraph to be between -0.5 & 0.5 by dividing by accumulated amplitude
			    for(var i=0; i<totalGraph.length; i++) {
			        totalGraph[i] = totalGraph[i]/totalAmplitude;
			    }

				function getNoiseFunctionResults(len, amplitude, freq) {

				    //console.log("getNoise(amplitude="+amp+",frequency"+freq+")");
				    var result = 0;//between -0.5 & 0.5
				    var wavelength = len/freq;//divide imgWidth by frequency to get wavelength
				    var results = [];
				    //start with random seed
				    var seed = Math.round(Math.random()*0x7FFFFFFF); //seed for prng... can be any uint (except 0)

				    //get next seed  - used for interpolation  
				    var nextseed = prng(seed);  

				    //for each x value 
				    for(var x=0; x<len; x++) {

				        //if we are on a factor of wavelength ... get psuedorandom y value 
				        if(x % wavelength === 0) {
				            //store nextseed as seed
				            seed  = nextseed;
				            //get next nextseed
				            nextseed = prng(seed); 
				            //get y value from pseudorandom number
				            result = (seed/0x7FFFFFFF)*amplitude - amplitude/2;
				        } else {
				            //interpolate value between seed & nextseed    
				            result = (interpolate(seed, nextseed, (x % wavelength)/wavelength)/0x7FFFFFFF)*amplitude - amplitude/2;
				        }
				        results.push(result);
				    }
				    return results; 
				}

				function prng(seed) {
				    //to get a full period sequence you should feed back the seed
				    return seed * 16807 % 0x7FFFFFFF;   
				    //to get a value between 0 & 1, divide result / 0x7FFFFFFF
				}

				function interpolate(a,b,i) {
				    //cosine interpolation
				    var ft = i*Math.PI;
				    var f = (1 - Math.cos(ft)) * 0.5;
				    return a*(1-f) + b*f;
				}
				
			return totalGraph;
		}
	};
});