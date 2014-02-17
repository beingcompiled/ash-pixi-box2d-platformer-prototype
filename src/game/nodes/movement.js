define([

    'ash', 
    'game/components/attributes/physics'

], function (Ash, Physics) {

    var Movement = Ash.Node.create({
		physics: Physics
    });

    return Movement;
});
