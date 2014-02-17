define([
    
    'ash', 
    'game/components/behaviors/selfdestruct'

], function(Ash, SelfDestruct) {

    var SelfDestructNode = Ash.Node.create({
        selfdestruct : SelfDestruct
    });

    return SelfDestructNode;
});