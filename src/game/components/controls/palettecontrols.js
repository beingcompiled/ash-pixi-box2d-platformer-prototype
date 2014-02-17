define(['ash'], function (Ash) {
    
    var PaletteControls = Ash.Class.extend({
        
        constructor: function (next, last, randomPalette) {
			this.nextPalette = next;
            this.lastPalette = last;
            this.randomPalette = randomPalette;
        }
    });

    return PaletteControls;
});
