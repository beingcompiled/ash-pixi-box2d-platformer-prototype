define([

    'ash', 
    'game/components/controls/musiccontrols'

], function (Ash, MusicControls) {

    var components = {
          control       : MusicControls
    };

    var MusicControl = Ash.Node.create(components);

    return MusicControl;
});
