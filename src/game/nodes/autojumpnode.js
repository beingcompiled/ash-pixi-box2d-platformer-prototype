define([
    
    'ash', 
    'game/components/attributes/physics',
    'game/components/behaviors/autojump'

], function (Ash, Physics, AutoJump) {
 
	var AutoJumpNode = Ash.Node.create({
		physics: Physics,
		autojump: AutoJump
    });

    return AutoJumpNode;
});