define([
    
    'ash', 
    'game/components/attributes/physics',
    'game/components/attributes/display'

], function (Ash, Physics, Display) {

    var Render = Ash.Node.create({
        physics : Physics,
        display : Display
    });

    return Render;
});