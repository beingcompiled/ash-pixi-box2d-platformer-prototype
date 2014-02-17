define([

    'ash', 
    'game/components/controls/motioncontrols', 
    'game/components/attributes/physics'

], function (Ash, MotionControls, Physics) {

    var components = {
          control       : MotionControls
        , physics       : Physics
    };

    var MotionControl = Ash.Node.create(components);

    return MotionControl;
});
