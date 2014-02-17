define(['ash'], function (Ash) {

    var BowControls = Ash.Class.extend({

        constructor: function (trigger) {
            this.trigger = trigger;
            this.shooting = false;
        }
    });

    return BowControls;
});
