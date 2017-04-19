var game = game || {};

game.misc = game.misc || {};

game.misc.collision = function(domId, r1) {
        var g = $('#' + domId)
        var r2 = g.get()[0].getBoundingClientRect();
        return !(r2.left > r1.right ||
                    r2.right < r1.left ||
                    r2.top > r1.bottom ||
                    r2.bottom < r1.top);
};
