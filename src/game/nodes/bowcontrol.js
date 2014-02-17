define([
    
    'ash', 
    'game/components/controls/bowcontrols', 
    'game/components/attributes/bow', 
    'game/components/attributes/physics',
    'game/components/attributes/sound'

], function (Ash, BowControls, Bow, Physics, Sound) {
    
    var BowControl = Ash.Node.create({
          control : BowControls
        , bow : Bow
        , physics : Physics
        , sound : Sound
    });

    return BowControl;
});
