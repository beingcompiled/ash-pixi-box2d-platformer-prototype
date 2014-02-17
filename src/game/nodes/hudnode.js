define([
    
    'ash', 
    'game/components/attributes/life',
    'game/components/attributes/hud'

], function (Ash, Life, Hud) {
 
	var HudNode = Ash.Node.create({
		life: Life,
		hud: Hud
    });

    return HudNode;
});
