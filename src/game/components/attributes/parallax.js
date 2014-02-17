define(['ash'], function(Ash) {
	
    var Parallax = Ash.Class.extend({

        constructor: function(view, order) {
            
            this.id = view.id;
            this.view = view;
            this.order = order;
            this.color = view.color;
        }
    });

    return Parallax;
});