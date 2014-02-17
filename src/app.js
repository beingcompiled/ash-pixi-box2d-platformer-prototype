require([

    'brejep/fillsnfixes',
    'brejep/keypoll',
    'game/game',
    'modernizr',
    'stats',

], function(

    Fixes,
    KeyPoll,
    Game,
    Modernizr,
    Stats

    ) {
        'use strict';

        function App() {

            var x = document.getElementById('canvas-container').offsetWidth,
                y = document.getElementById('canvas-container').offsetHeight,
                CANVAS_WIDTH = x, CANVAS_HEIGHT = y;

            this.initialise = function() {
                //console.log("init", Math.random());

                // brejep polyfills for requestAnimationFrame and key codes
                Fixes.initialise();

                var canvas = createCanvas();
                var wrapper = document.getElementById('canvas-container');
                wrapper.appendChild(canvas);

                // brejep keyboard poll
                KeyPoll.initialise(window);

                // check for touch events
                var touchable = Modernizr.touch;

                try {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    var soundSupport = true;
                } catch(e) {
                    alert('Web Audio API is not supported in this browser');
                }

                // stats
                var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                stats.domElement.style.opacity = '0.5';
                //wrapper.appendChild(stats.domElement);

                var game = new Game(wrapper, canvas, stats, touchable, soundSupport);
                game.start();
            };

            function createCanvas() {

                var canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'game_stage');
                canvas.setAttribute('width', CANVAS_WIDTH);
                canvas.setAttribute('height', CANVAS_HEIGHT);
                return canvas;
            }   
        }
        
        new App().initialise();
    }
);
