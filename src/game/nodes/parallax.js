define([
    
    'ash', 
    'game/components/attributes/parallax'

], function (Ash, Parallax) {

    var ParallaxNode = Ash.Node.create({
        parallax: Parallax
    });

    return ParallaxNode;
});