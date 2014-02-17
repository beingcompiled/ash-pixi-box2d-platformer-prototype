define([
    
    'ash', 
    'game/components/attributes/sound'

], function (Ash, Sound) {
 
	var SoundNode = Ash.Node.create({
		sound: Sound
    });

    return SoundNode;
});