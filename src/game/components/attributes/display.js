define(['ash'], function(Ash) {
	
    var Display = Ash.Class.extend({

        constructor: function(view) {
            
            this.id = view.id;
            this.view = view;
            this.color = view.color;
            this.state = view.state;
            this.update = view.update;
        }
    });

    return Display;
});
