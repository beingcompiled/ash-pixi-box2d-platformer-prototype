define(['ash'], function (Ash) {
    
    var Hud = Ash.Class.extend({
        
        constructor: function(elements) {
            
            this.elements = elements;

            /* 
            // example
            this.elements = {
                life: ["health", "civilians"]
            }
            */
        }
    });

    return Hud;
});
