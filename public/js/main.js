/* Jquery plugin for Nes Controller */

(function( $ ) {

    $.fn.nestiplayer = function( options ) {


        var settings = $.extend( {}, $.fn.nestiplayer.defaults, options );

        return this.each(function() {
            var $this = $( this );

            var socket = io.connect(window.location.hostname);

            var keys = {
                'up'     : false,
                'down'   : false,
                'left'   : false,
                'right'  : false,
                'a'      : false,
                'b'      : false,
                'start'  : false,
                'select' : false
            };

            $this.on('click', function (e) {
                //console.log(e.target);
            });

            jQuery(settings.buttonUp).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressUp();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressUp(false);
                }
            });
            jQuery(settings.buttonDown).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressDown();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressDown(false);
                }
            });
            jQuery(settings.buttonLeft).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressLeft();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressLeft(false);
                }
            });
            jQuery(settings.buttonRight).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressRight();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressRight(false);
                }
            });
            jQuery(settings.buttonA).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressA();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressA(false);
                }
            });
            jQuery(settings.buttonB).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressB();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressB(false);
                }
            });
            jQuery(settings.buttonStart).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressStart();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressStart(false);
                }
            });
            jQuery(settings.buttonSelect).on('mousedown mouseup mouseout touchstart touchend', function (e) {
                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    pressSelect();
                } else if (e.type == 'touchend' || e.type == 'mouseup' || e.type == 'mouseout') {
                    pressSelect(false);
                }
            });

            // *****************
            // Private functions
            // *****************

            // Send the keys to the server
            function sendKeyState() {
                socket.emit('keys',keys);
                console.log('sendKeyState');
            }

            // All the button handling
            function pressUp(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.up = pressing;
                sendKeyState();
                if (pressing) {
                } else {

                }
            }
            function pressDown(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.down = pressing;
                sendKeyState();
                console.log('Down');
            }
            function pressLeft(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.left = pressing;
                sendKeyState();
                console.log('left');
            }
            function pressRight(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.right = pressing;
                sendKeyState();
                console.log('right');
            }
            function pressA(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.a = pressing;
                sendKeyState();
                console.log('a');
            }
            function pressB(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.b = pressing;
                sendKeyState();
                console.log('b');
            }
            function pressStart(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.start = pressing;
                sendKeyState();
                console.log('start');
            }
            function pressSelect(pressing) {
                pressing = typeof pressing !== 'undefined' ? pressing : true;
                keys.select = pressing;
                sendKeyState();
                console.log('select');
            }
        });

    };


    $.fn.nestiplayer.defaults = {
        buttonUp: '#up-button',
        buttonDown: '#down-button',
        buttonLeft: '#left-button',
        buttonRight: '#right-button',
        buttonA: '#a-button',
        buttonB: '#b-button',
        buttonStart: '#start-button',
        buttonSelect: '#select-button'
    };

}( jQuery ));