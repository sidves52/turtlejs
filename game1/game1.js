function gameworld() {
    var w = function() {};

    var timeUnit = 5;
    var os = [];

    var t = 0,
        width,
        height;

    w.time = function() {
        return t;
    };

    w.collisionCallback = function(sourceObj, sourceRect, cb) {
        os.forEach(function(o) {
            if (o === sourceObj) {
                return;
            }

            if (o.collision(sourceRect)) {
                cb(o);
            }
        });
    };

    w.width = function(_) {
        if (arguments.length > 0) {
            width = _;
            return;
        }

        return width;
    };

    w.height = function(_) {
        if (arguments.length > 0) {
            height = _;
            return;
        }

        return height;
    };

    w.create = function() {
        var b;

        var ballCount = 5;
        for (var i = 0; i < ballCount; ++i) {
            b = ball();
            b.position(200, 100);
            b.force(10);
            os.push(b);
        }

        $('#max').text(ballCount);

        os.push(person());

        /*var s1 = spike();
        s1.position(280, 375);
        os.push(s1);

        var s2 = spike();
        s2.position(240, 375);
        os.push(s2);*/
    };

    w.isEmpty = function(boundingRect) {
    };

    var playing = false;
    function play() {
        playing = true;

        function iter() {
            if (playing === false) {
                return;
            }

            ++t;
            os.forEach(function(o) {
                o.step();
            });

            var hiddenCount = 0;
            os.forEach(function(o) {
                if (o.hidden()) {
                    hiddenCount++;
                    console.log(o, hiddenCount);
                }
            });
            console.log('done');
            $('#score').text(hiddenCount);

            setTimeout(iter, timeUnit);
        };

        setTimeout(iter, timeUnit);
    }

    function playOrPause() {
        if (playing === false) {
            play();
        } else {
            playing = false;
        }
    };

    w.start = function() {
        console.log('starting');

        os.forEach(function(o) {
            o.world(w);
        });

        os.forEach(function(o) {
            o.initialize();
        });

        play();

        Mousetrap.bind(['ctrl+p'], playOrPause);
    };

    return w;
};
