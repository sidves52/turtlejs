var spikeId = 1;

function spike() {
    var s = function() { return 'spike'; };
    var pid = 'spike' + spikeId;

    s.collision = function(r) {
        return game.misc.collision(pid, r);
    };

    var x,
        y,
        color = '#a62c19';

    s.identity = function() {
        return {
            otype: 'spike'
        }
    };

    s.hidden = function() {
        return false;
    };

    s.position = function(_x, _y) {
        x = _x;
        y = _y;
        return s;
    };

    s.world = function(w) {
        s.w = w;
        return s;
    };

    s.initialize = function() {
        var h = '<svg><polygon id="' + pid +
            '" points="' + (x - 5) + ',' + y + ' ' + x + ',' + (y - 13) + ' ' + (x + 5) + ',' + y +
            '" style="fill:' + color + ';stroke:' + color + ';stroke-width:1"></polygon></svg>';
        $('#world').append(h);
    };

    s.step = function() {
//        console.log('spike step');
    };

    return s;
}
