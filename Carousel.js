carousel({
    box_b                  : $('.carousel-big-box'),
    box_s                  : $('.carousel-small-box'),
    buttons                : $('.button').getElementsByTagName("li"),
    time                   : 400,
    interval               : 2,
    carousel_time_interval : 3000,
})

var carousel = function (opts){
    var ele = {
        box_b                  : $('.carousel-big-box'),
        box_s                  : $('.carousel-small-box'),
        buttons                : $('.button').getElementsByTagName("li"),
        time                   : 400,
        interval               : 2,
        carousel_time_interval : 3000,
    };

    for (var key in opts) {
        ele[key] = opts[key];
    };

    var animated           = false;
        index              = 1;
        img_num            = ele.buttons.length;
        box_b_width        = ele.box_b.offsetWidth;
        frist_picture_left = -box_b_width;
        last_picture_left  = frist_picture_left * img_num;

    var animate = function(distance){
        animated = true;
    
        var overLeft  = ele.box_s.offsetLeft + distance;
            time      = ele.time;  //移动一张图片需要的时间
            interval  = ele.interval;    //位移间隔
            speed     = distance/(time/interval);

        var go = function () {
            var newLeft = ele.box_s.offsetLeft;

            var move = function () {
                ele.box_s.style.left = newLeft + speed + "px";
                setTimeout(go, interval)
            };
            var stop = function () {
                animated = false;
                ele.box_s.style.left = overLeft + "px";
                if (newLeft > frist_picture_left) {
                    ele.box_s.style.left = last_picture_left + "px";
                };
                if (newLeft < last_picture_left) {
                    ele.box_s.style.left = frist_picture_left + "px";
                };
            };

            if (speed > 0 && newLeft < overLeft){
                move();
            }else if(speed < 0 && newLeft > overLeft){
                move();
            }else{
                stop();
            };
        };
        go();
    };

    var showButton =  function () {
        for (var i = 0; i < img_num; i++) {
            if (ele.buttons[i].className === "on") {
                ele.buttons[i].className = ""
                break;
            };
        };
        ele.buttons[index - 1].className = "on";
    };

    var rightMove = function () {
        if (!animated) {
            if (index === img_num) {
                index = 1;
            }else{
                index ++;
            };
            showButton();
            animate(frist_picture_left);
        };
    };

    for (var i = 0; i < img_num; i++) {
        ele.buttons[i].onclick = function(){
            if (!animated) {
                if (this.className == "on") {
                    return;
                }
                var myIndex = parseInt(this.getAttribute("index"));
                var offset = frist_picture_left * (myIndex - index);
                index = myIndex;
                showButton();
                animate(offset);
            };
        };
    };

    timer(rightMove, ele.carousel_time_interval, true);
};