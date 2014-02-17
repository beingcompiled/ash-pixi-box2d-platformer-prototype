define([
    
    'ash', 
    'game/components/attributes/physics',
    'game/components/attributes/proximity',
    'game/components/attributes/display'

], function (Ash, Physics, Proximity, Display) {
 
	var ProximityNode = Ash.Node.create({
		physics: Physics,
		proximity: Proximity,
		display : Display
    });

    return ProximityNode;
});