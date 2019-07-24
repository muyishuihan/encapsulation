var $$ = function (dom, num) {
    var ele = (num === 'all') ? document.querySelectorAll(dom) : document.querySelector(dom);
    return ele;
};


