define([

    'ash',
    'audio',
    'jsfx',
    'jsfxlib',
    'underscore'

], function (

        Ash,
        audio,
        jsfx,
        jsfxlib

    ) {

    var SoundManager = Ash.System.extend({

        audioLibParams : {
              pickup0:    [ "square", 2.0000, 0.1140, 0.0000, 0.0880, 0.5490,0.4780,20.0000,1394.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.3480,0.1060,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , pickup1:    [ "square", 0.0000, 0.4000, 0.0000,0.0160, 0.5370,0.1080,20.0000,1003.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.3460,0.2370,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , pickup2:    [ "square", 0.0000, 0.4000, 0.0000,0.0420, 0.5940,0.1180,20.0000,1360.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.4020,0.1280,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , explosion0: [ "noise", 2.0000, 0.1140, 0.0000, 0.2040, 0.2730,0.4380,20.0000,274.0000,2400.0000,-0.3020,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,-0.1300,-0.2280,1.0000,0.0000,0.0000,0.0000,0.0000]
            , explosion1: [ "noise", 0.0000, 0.4000, 0.0000,0.2600, 0.4080,0.0060,20.0000,1193.0000,2400.0000,-0.2720,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,-0.0380,-0.2940,1.0000,0.0000,0.0000,0.0000,0.0000]
            , explosion2: [ "noise", 0.0000, 0.4000, 0.0000,0.1660, 0.3270,0.3360,20.0000,223.0000,2400.0000,-0.2720,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.4464,0.4040,-0.4460,1.0000,0.0000,0.0000,0.0000,0.0000]
            , teleport0:  [ "saw", 2.0000, 0.1140, 0.0000, 0.1720, 0.0000,0.1980,20.0000,475.0000,2400.0000,0.4580,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.4144,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , teleport1:  [ "saw", 0.0000, 0.4000, 0.0000,0.0920, 0.0000,0.3040,20.0000,558.0000,2400.0000,0.5760,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.7096,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , teleport2:  [ "square", 0.0000, 0.4000, 0.0000, 0.4000,0.0000,0.4260,20.0000,479.0000,2400.0000,0.6560,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.1840,0.0000,0.4496,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , hit0:       [ "noise", 2.0000, 0.1140, 0.0000, 0.0480,0.0000,0.1140,20.0000,440.0000,2400.0000,-0.5200,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , hit1:       [ "noise", 0.0000, 0.4000, 0.0000, 0.0280,0.0000,0.2960,20.0000,1083.0000,2400.0000,-0.4140,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , hit2:       [ "noise", 0.0000, 0.4000, 0.0000, 0.0800,0.0000,0.8680,20.0000,1089.0000,2400.0000,-0.5520,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
            , shoot0:     [ "square", 2.0000, 0.2240, 0.0270, 0.0160,0.1950,0.1000,58.0000,1552.0000,382.0000,-0.7480,-0.7940,0.0000,0.0100,-0.2012,-0.8620,0.5300,0.0000,0.5000,-0.8540,0.0160,-0.3260,1.0000,0.9950,0.1740,0.6440,0.4060,0.3180]
            , shoot1:     [ "sine", 0.0000, 0.4000, 0.0050, 0.2840,0.6720,0.0000,110.0000,1523.0000,1490.0000,-0.7300,-0.5060,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.2280,0.1520,0.0000,0.0260,0.1260,1.0000,0.0000,0.0000,0.0000,0.0000]
            , shoot2:     [ "sine", 0.0000, 0.4000, 0.0000, 0.2040,0.2370,0.0480,20.0000,1098.0000,2400.0000,-0.6360,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,-0.0680,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.2920,0.0000]
        },
        sounds: null,

        constructor: function() {
            try {
                window.AudioContext = window.AudioContext||window.webkitAudioContext;
                this.sounds = jsfxlib.createWaves(this.audioLibParams);
            } catch(e) {
                alert('Web Audio API is not supported in this browser');
            }
        },

        play: function(id) {
            this.sounds[id].play();
        },

        playRandom: function(node, id) {

            var soundArray = node.sound.sounds[id];

            //TO DO: node wasted before soundArray is found?
            if (soundArray) {
                var length = soundArray.length,
                    randomSound = soundArray[_.random(0, length-1)];
                
                this.sounds[randomSound].play();
            }
        }
    });

    return SoundManager;
});