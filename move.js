var mover = function() {
    console.log("working so far!");
    var m = function() {};
    var globalCounter = 20;
    var globalDelay = 5;
    var obstaCount = 2;
    var jumping = false;

    m.initialize = function() {
        Mousetrap.bind(['left', 'a'], m.left);
        Mousetrap.bind(['right', 'd'], m.right);
        Mousetrap.bind(['up', 'w'], m.up);
        Mousetrap.bind(['down', 's'], m.down);
        Mousetrap.bind('p', m.jump);

    };

    function overlaps(oId1, oId2, oId3, oId4) {
        var r1 = $('#' + oId1).get()[0].getBoundingClientRect();
        var r2 = $('#' + oId2).get()[0].getBoundingClientRect();
        }
        if !(oId3) {
            return !(r2.left > r1.right ||
                        r2.right < r1.left ||
                        r2.top > r1.bottom ||
                        r2.bottom < r1.top);
        }
    };

    function draw(Flog) {
        var $g = $('#person')
        var x = +($g.attr('data-x'));
        var y = +($g.attr('data-y'));
        var s = "translate(" + x + "," + y + ")";
        var obstasChecked = obstaCount;
        var spike = "spike" + obstasChecked;
        $g.attr('transform', s);
        console.log(Flog + " now at " + s);
        var dead = false;
        while (obstasChecked > 0) {
            console.log(overlaps('person', 'spike' + obstasChecked))
            if (overlaps('person', 'spike' + obstasChecked)) {
                dead = 1
            }
            --obstasChecked;
        }
        if (dead == true) {
            console.log('ouch!');
            $g.attr('data-x', '20');
            $g.attr('data-y', '20');
            draw();
        }
    };

    function repeatCaller(f, config) {
        if (!config) {
            config = {};
        }
        var counter = config.counter || globalCounter;
        var delay = config.delay || globalDelay;
        var alldone = config.alldone;
        iter();
        function iter() {
            if (counter > 0) {
                console.log(counter);
                --counter;
                f();
                setTimeout(iter, delay);
            } else {
                if (alldone) {
                    alldone();
                }
            }
        }
    };

    m.left = function() {
        repeatCaller(oneleft);
    };

    m.right = function() {
        repeatCaller(oneright);
    };

    m.up = function() {
        repeatCaller(oneup);
    };

    m.down = function() {
        repeatCaller(onedown);
    };

    m.jump = function() {
        actualjump();
    };

    function actualjump() {
        repeatCaller(oneup, {
            counter: 40,
            delay: 10,
            alldone: function() {
                repeatCaller(onedown, {
                    counter: 40,
                    delay: 10,
                });
            },
        });
    };

    function oneleft() {
        var $g = $('#person');
        var x = +($g.attr('data-x'));
        if (x > 12) {
            x -= 1;
        }
        $g.attr('data-x', x);
        draw("left");
    };

    function oneright() {
        var $g = $('#person');
        var x = +($g.attr('data-x'));
        if (x < 469) {
            x += 1;
        }
        $g.attr('data-x', x);
        draw("right");
    };

    function oneup() {
        var $g = $('#person')
        var y = +($g.attr('data-y'));
        if (y > 2) {
            y -= 1;
        }
        $g.attr('data-y', y);
        draw("up");
    };

    function onedown() {
        var $g = $('#person')
        var y = +($g.attr('data-y'));
        if (y < 305) {
            y += 1;
        }
        $g.attr('data-y', y);
        draw("down");
    };

    return m;
};