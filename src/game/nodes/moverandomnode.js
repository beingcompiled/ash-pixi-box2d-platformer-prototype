define([
    
    'ash', 
    'game/components/attributes/physics',
    'game/components/behaviors/MoveRandom'

], function (Ash, Physics, MoveRandom) {
 
	var MoveRandomNode = Ash.Node.create({
		physics: Physics,
		moveRandom: MoveRandom
    });

    return MoveRandomNode;
});