
var personId = 1;

function person() {
    var p = function() { return 'person'; };

    var pid = 'person' + personId;
    ++personId;

    var targetX,
        targetY,
        w,
        step = 1,
        duration = 20,
        color = '#555555',
        dims;

    p.identity = function() {
        return {
            otype: 'person'
        }
    };

    p.world = function(_) {
        w = _;
    };

    p.hidden = function() {
        return false;
    };

    p.initialize = function() {
        var h = $('#person_template').html();
        $('#world').append(h);

        $('#world').find('g').last().attr('id', pid);
        var $g = $('#' + pid);
        $g.find('circle').css('fill', color)
                         .css('stroke', color);
        $g.find('polygon').css('fill', color)
                          .css('stroke', color);
        $g.find('line').attr('stroke', color);

        var x = +($g.attr('data-x'));
        var y = +($g.attr('data-y'));
        targetX = x;
        targetY = y;

        dims = $g.get()[0].getBoundingClientRect();

        Mousetrap.bind(['left', 'a'], left);
        Mousetrap.bind(['right', 'd'], right);
        Mousetrap.bind(['up', 'w'], up);
        Mousetrap.bind(['down', 's'], down);
        Mousetrap.bind('p', jump);
    };

    p.collision = function(r) {
        return game.misc.collision(pid, r);
    };

    p.step = function() {
//        console.log('person step', w.time());

        var $g = $('#' + pid);

        var r = $g.get()[0].getBoundingClientRect();

        w.collisionCallback(p, r, function(o) {
            var i = o.identity();
            if (i.otype === 'ball') {
                o.hide();
            }
        });

        var x = +($g.attr('data-x'));
        var y = +($g.attr('data-y'));

        if (targetX != x) {
            if (targetX < x) {
                x = x - step;
                if (x < 3) {
                    x = 3;
                }
            } else {
                x = x + step;
                if (x > w.width() - (dims.right - dims.left) - 3) {
                    x = w.width() - (dims.right - dims.left) - 3;
                }
            }

            $g.attr('data-x', x);
            draw();
        }

        if (targetY != y) {
            if (targetY < y) {
                y = y - step;
                if (y < 3) {
                    y = 3;
                }
            } else {
                y = y + step;
                if (y > w.height() - (dims.bottom - dims.top) - 3) {
                    y = w.height() - (dims.bottom - dims.top) - 3;
                }
            }

            $g.attr('data-y', y);
            draw();
        }
    };

    function draw() {
        var $g = $('#' + pid);
        var x = +($g.attr('data-x'));
        var y = +($g.attr('data-y'));
        var s = "translate(" + x + "," + y + ")";
        $g.attr('transform', s);
    };

    function left() {
        var x = +($('#' + pid).attr('data-x'));
        targetX = x - duration;
    };

    function right() {
        var x = +($('#' + pid).attr('data-x'));
        targetX = x + duration;
    };

    function up() {
        var y = +($('#' + pid).attr('data-y'));
        targetY = y - duration;
    };

    function down() {
        var y = +($('#' + pid).attr('data-y'));
        targetY = y + duration;
    };

    function jump() {
    };

    return p;
}
