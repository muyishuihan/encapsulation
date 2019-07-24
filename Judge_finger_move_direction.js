var direction;

function judgeDirection (ele) {
    var startX;
    var startY;
    var moveEndX;
    var moveEndY;
    var X;
    var Y;

    ele.addEventListener("touchstart", touchstart)
    function touchstart (e) {
        e.preventDefault();
        startX = e.changedTouches[0].pageX,
        startY = e.changedTouches[0].pageY;
    };
    ele.addEventListener("touchmove", touchmove)
    function touchmove (e) {
        e.preventDefault();
        moveEndX = e.changedTouches[0].pageX,
        moveEndY = e.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
         
        if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
            console.log("从左到右");
            direction = 'right';
        }
        else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
            console.log("从右到左");
            direction = 'left';
        }
        else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            console.log("从上到下");
            direction = 'bottom';
        }
        else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            console.log("从下到上");
            direction = 'top';
        }
        else{
            console.log("just touch");
            direction = 'touch';
        }
    };

    ele.removeEventListener("touchend", touchstart);
    ele.removeEventListener("touchend", touchmove);
}