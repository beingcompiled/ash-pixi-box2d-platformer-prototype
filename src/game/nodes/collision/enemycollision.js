define([
    
    'ash'
    ,'game/components/entities/enemy'
    ,'game/components/attributes/physics'
    ,'game/components/attributes/life'
    ,'game/components/attributes/melee'
    ,'game/components/behaviors/Predator'
    ,'game/components/attributes/display'
    ,'game/components/attributes/sound'

], function (Ash, Enemy, Physics, Life, Melee, Predator, Display, Sound) {
    
    var EnemyCollision = Ash.Node.create({
        enemy: Enemy,
        physics: Physics,
        life: Life,
        melee: Melee,
        predator: Predator,
        display: Display,
        sound: Sound
    });

    return EnemyCollision;
});