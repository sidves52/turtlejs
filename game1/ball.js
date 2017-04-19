
var ballId = 1;

function ball() {
    var s = function() { return 'ball'; };

    var pid = 'ball' + ballId;
    ++ballId;

    var x,
        y,
        xinc = 1,
        yinc = 1,
        force,
        yforce = 10;
        radius = 5,
        color = '#00aae3',
        w;

    var hide = false;

    s.identity = function() {
        return {
            otype: 'ball',
            oid: pid,
        }
    };

    s.hide = function() {
        hide = true;
        var $g = $('#' + pid);
        $g.css('display', 'none');
    };

    s.hidden = function() {
        return hide;
    };

    s.collision = function(r) {
        return game.misc.collision(pid, r);
    };

    s.position = function(_x, _y) {
        x = _x;
        y = _y;
        return s;
    };

    s.force = function(_) {
        force = _;
        return s;
    };

    s.color = function(_) {
        color = _;
        return s;
    };

    s.world = function(_) {
        w = _;
        return s;
    };

    s.initialize = function() {
        var h = '<svg><circle id="' + pid + '" cx="' + x + '" cy="' + y + '" r="' + radius + '" style="fill:' + color + ';"></circle></svg>';
        $('#world').append(h);
    };

    s.step = function() {
//        console.log('spike step');
        var $g = $('#' + pid);
        x = +($g.attr('cx'));
        y = +($g.attr('cy'));

        if (force > 0) {
            x += xinc;
            if (x >= w.width()) {
                x -= xinc;
                force = -10;
                xinc = 0.5 + Math.random() * 3;
                yinc = 0.5 + Math.random() * 2;
            }
        } else {
            x -= xinc;
            if (x < 0) {
                x += xinc;
                force = 10;
                xinc = 0.5 + Math.random() * 3;
                yinc = 0.5 + Math.random() * 2;
            }
        }

        if (yforce > 0) {
            y += yinc;
            if (y >= w.height()) {
                y -= yinc;
                yforce = -10;
                xinc = 0.5 + Math.random() * 3;
                yinc = 0.5 + Math.random() * 2;
            }
        } else {
            y -= yinc;
            if (y < 0) {
                y += yinc;
                yforce = 10;
                xinc = 0.5 + Math.random() * 3;
                yinc = 0.5 + Math.random() * 2;
            }
        }

        draw();
        // console.log(x, y, pid, w.time());
    };

    function draw() {
        var $g = $('#' + pid);
        $g.attr('cx', x);
        $g.attr('cy', y);
    }

    return s;
}
