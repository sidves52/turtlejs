
var c = document.getElementById("maze").getContext("2d")

function tile(x, y, type, lw, color) {
    c.beginPath();
    clr = (color || "black")
    lw = (lw || 3)

    if (type == "right") {
        c.Rect(x, y, x + 20, y + 3);
    }

    if (type == "left") {
        c.Rect(x, y, x - 20, y + 3);
    }

    if (type == "upright") {
        c.Rect(x, y, x + 20, y + 3);
        c.Rect(x + 20, y + 3, x + 23, y - 23)
    }

    if (type == "upleft") {
        c.Rect(x, y, x - 20, y + 3)
        c.Rect(x - 20, y + 3, x - 17, y - 23)
    }

    if (type == "downright") {
        c.Rect(x, y, x + 20, y + 3)
        c.Rect(x + 20, y + 3, x + 23, y + 23)
    }

    if (type == "downleft") {
        c.Rect(x, y, x - 20, y + 3)
        c.Rect(x - 20, y + 3, x - 17, y + 23)
    }

    c.color = (clr || "black")
    c.lineWidth = (lw || 3)
};