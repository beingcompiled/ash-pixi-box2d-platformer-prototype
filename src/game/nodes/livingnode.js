define([
    
    'ash'
    ,'game/components/attributes/life'
    ,'game/components/attributes/physics'
    ,'game/components/attributes/display'
    ,'game/components/attributes/sound'

], function (Ash, Life, Physics, Display, Sound) {
 
	var LivingNode = Ash.Node.create({
		life: Life,
		physics: Physics,
		display: Display,
        sound: Sound
    });

    return LivingNode;
});
