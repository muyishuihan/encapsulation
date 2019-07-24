function addEvent(element, evnt, funct){
  // if else 结构可用三元运算符 ? : 来精简
  // 这里之所以要这样写，是便于读者理解
  if (element.attachEvent) // IE 8 及更低版本浏览器
   return element.attachEvent('on'+evnt, funct);
  else // IE 8 及以上，或其它浏览器
   return element.addEventListener(evnt, funct, false);
}

// 调用示例
addEvent(
    document.getElementById('myElement'),
    'click',
    function () { alert('hi!'); }
);