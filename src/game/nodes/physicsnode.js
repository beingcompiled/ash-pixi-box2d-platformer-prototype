define([
    
    'ash', 
    'game/components/attributes/physics'

], function (Ash, Physics) {
 
	var PhysicsNode = Ash.Node.create({
		physics: Physics    
    });

    return PhysicsNode;
});