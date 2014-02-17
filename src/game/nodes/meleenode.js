define([
    
    'ash',
    'game/components/attributes/physics',
    'game/components/attributes/melee',
    'game/components/attributes/sound'

], function (Ash, Physics, Melee, Sound) {
 
	var MeleeNode = Ash.Node.create({
		physics: Physics
		, melee: Melee
		, sound: Sound
    });

    return MeleeNode;
});