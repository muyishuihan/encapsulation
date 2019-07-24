var changeClass = function (obj,css){  
    for(var atr in css){  
        obj.style[atr] = css[atr];  
    }  
}