
var turtle = function() {
    var t = function() {};

    t.draw = function() {
        var c = document.getElementById("drawhere").getContext("2d");

        function drawLine(config) {
            c.beginPath();
            c.moveTo(config.x, config.y);
            c.lineTo(config.x2, config.y2);
            c.lineWidth = (config.lw || 5);
            c.strokeStyle = (config.color || "black");
            c.stroke();
        };

        function drawRect(config) {
            c.beginPath();
            c.rect(config.x, config.y, config.x2, config.y2);
            c.lineWidth = (config.lw || 5);
            c.strokeStyle = (config.color || "black");
            c.stroke();
        };

        function drawCurve(config) {
            c.beginPath();
            c.moveTo(config.x, config.y);
            c.bezierCurveTo(config.x2, config.y2, config.x3, config.y3, config.x4, config.y4);
            c.lineWidth = (config.lw || 2);
            c.strokeStyle = (config.color || "black");
            c.stroke();
            };

            /*function drawCircle(config) {
            c.beginPath();
            c.moveTo(config.x, config.y);
            c.strokeStyle = (config.color || "black");
            c.stroke();
            };*/

        /*drawLine({
            x: 70,
            y: 0,
            x2: 70,
            y2: 300,
            color: "red",
        });

        drawLine({
            x: 70,
            y: 150,
            x2: 220,
            y2: 150,
            color: "red",
        });

        drawLine({
            x: 220,
            y: 0,
            x2: 220,
            y2: 300,
            color: "red",
        });*/

        drawRect({
            x: 0,
            y: 0,
            x2: 300,
            y2: 300,
            lw: 2.5,
        });

        /*drawCurve({
            x: 0,
            y: 0,
            x2: 50,
            y2: 20,
            x3: 150,
            y3: 40,
            x4: 300,
            y4: 0,
            color: "black",
        });

        drawCurve({
            x: 0,
            y: 0,
            x2: 20,
            y2: 50,
            x3: 40,
            y3: 150,
            x4: 0,
            y4: 300,
            color: "black",
        });

        drawCurve({
            x: 0,
            y: 300,
            x2: 280,
            y2: 250,
            x3: 260,
            y3: 150,
            x4: 300,
            y4: 300,
            color: "green",
        });
    };*/

    return t;
};