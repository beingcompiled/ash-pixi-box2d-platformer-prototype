define([

    'ash',
    'game/components/attributes/physics',
    'game/components/attributes/display'

], function (Ash, Physics, Display) {

    var AnimationNode = Ash.Node.create({
        physics         : Physics,
        display         : Display
    });

    return AnimationNode;
});