var timer = function (func, time){
    var startTime = new Date().getTime(); 
    var count = 0; 

    var fixed = function () { 
        count++; 
        var offset = new Date().getTime() - (startTime + count * time); 
        var nextTime = time - offset; 
        if (nextTime < 0) {
            nextTime = 0;
        };
        func();
        setTimeout(fixed, nextTime); 
    };
    setTimeout(fixed, time); 
};


var index = function () {
    console.log('123123123123123');
};


timer(index, 1000);