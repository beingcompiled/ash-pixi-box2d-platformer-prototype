define([
    
    'ash', 
    'game/components/behaviors/Predator',
    'game/components/attributes/physics'

], function (Ash, Predator, Physics) {
 
	var PredatorNode = Ash.Node.create({
		predator: Predator,
		physics: Physics
    });

    return PredatorNode;
});
