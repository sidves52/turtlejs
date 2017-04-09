var mover = function() {
    console.log("yup2");
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

    function overlaps(objectId1, objectId2) {
        var r1 = $('#' + objectId1).get()[0].getBoundingClientRect();
        var r2 = $('#' + objectId2).get()[0].getBoundingClientRect();
        return !(r2.left > r1.right ||
                   r2.right < r1.left ||
                   r2.top > r1.bottom ||
                   r2.bottom < r1.top);
    };

    function draw() {
        var $g = $('#person')
        var x = +($g.attr('data-x'));
        var y = +($g.attr('data-y'));
        var s = "translate(" + x + "," + y + ")";
        var obstasChecked = obstaCount;
        var spike = "spike" + spikesChecked;
        $g.attr('transform', s);
        console.log(s);
        var dead = false;
        while (obtsasChecked > 0) {
            console.log(overlaps('person', 'spike' + obtsasChecked))
            if (overlaps('person', 'spike' + obtsasChecked)) {
                dead = true;
            }
            --spikesChecked;
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

        console.log("repeatcaller");
        console.log(counter);
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
        console.log("funconeright");
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
        console.log("oneleft");
        var $g = $('#person');
        var x = +($g.attr('data-x'));
        if (x > 1) {
            x -= 1;
        }
        $g.attr('data-x', x);
        draw();
    };

    function oneright() {
        console.log("oneright");
        var $g = $('#person');
        var x = +($g.attr('data-x'));
        if (x < 480) {
            x += 1;
        }
        $g.attr('data-x', x);
        draw();
    };

    function oneup() {
        var $g = $('#person')
        var y = +($g.attr('data-y'));
        if (y > 2) {
            y -= 1;
        }
        $g.attr('data-y', y);
        draw();
    };

    function onedown() {
        var $g = $('#person')
        var y = +($g.attr('data-y'));
        if (y < 305) {
            y += 1;
        }
        $g.attr('data-y', y);
        draw();
    };

    return m;
};