define(function () {

    var SystemPriorities = {
        preUpdate : 1,
        physics : 2,
        motionControl : 3,
        update : 4,
        resolveCollisions : 5,
        render : 6
    };

    return SystemPriorities;
});