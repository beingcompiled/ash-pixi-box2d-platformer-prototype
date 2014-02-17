define(['ash'], function (Ash) {
    
    var Sound = Ash.Class.extend({
        
        constructor: function(sounds) {
            
            this.sounds = sounds;
            this.playRandom = undefined; //set as string by multiple systems

            /* 
            // example
            this.sounds = {
                shoot: ["shoot0", "shoot1", "shoot2"],
                explosion: ["explosion0"]
            };
            */
        }
    });

    return Sound;
});
