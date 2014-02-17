define([
    
    'ash'
    , 'game/components/entities/hero'
    , 'game/components/attributes/physics'
    , 'game/components/controls/motioncontrols'

], function (Ash, Hero, Physics, MotionControls) {

    var components = {
          hero      : Hero
        , physics   : Physics
        , control   : MotionControls
    };
    
    var HeroCollision = Ash.Node.create(components);

    return HeroCollision;
});