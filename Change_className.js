//数组的indexOf方法封装
function indexOf(arr,value,start){
  //如果不设置start,则默认start为0
  if(arguments.length == 2){
    start = 0;
  }
  //如果数组中存在indexOf方法，则用原生的indexOf方法
  if(arr.indexOf){
    return arr.indexOf(value,start);
  }
  for( var i = 0; i < arr.length; i++){
    if(arr[i] === value){
      return i;
    }
  }
  return -1;
}
//数组去重方法封装
function noRepeat(arr){
  var result = [];
  for( var i = 0; i < arr.length; i++){
    if(indexOf(result,arr[i]) == -1){
      result.push(arr[i]);
    }
  }
  return result;
}
//inArray方法封装
function inArray(arr,value){
  for(var i = 0; i < arr.length; i++){
    if(arr[i] === value){
      return true;
    }
  }
  return false;
}
//去除首尾空格函数封装
function trim(arr){
  var result = arr.replace(/^\s+|\s+$/g,'');
  return result;
}
//getElementsByClassName函数封装
function getElementsByClassName(parentObj,classStr){
  var result = [];
  var objs = parentObj.getElementsByTagName('*');
  
  //如果classStr用空格分隔，则表示class必须同时满足才有效
  var targetArr1 = noRepeat(trim(classStr).split(/\s+/));
  //如果classStr用逗号分隔，则表示class只要有一个满足就有效
  var targetArr2 = noRepeat(trim(classStr).split(/\s*,\s*/));
    
  if(classStr.indexOf(',') == -1 ){
    //用空格分隔或者只有一个class
    label: for(var i = 0; i < objs.length; i++){
      var arr = noRepeat(trim(objs[i].className).split(/\s+/));
      for( var j = 0; j < targetArr1.length; j++){
        if(!inArray(arr,targetArr1[j])){
          continue label;
        }
      }
      result.push(objs[i]);
    }
    return result;
  }else{
    //用逗号分隔
    label: for(var i = 0; i < objs.length; i++){
        var arr = noRepeat(trim(objs[i].className).split(/\s+/));
        for( var j = 0; j < targetArr2.length; j++){
          if(inArray(arr,targetArr2[j])){
            result.push(objs[i]);
            continue label;
          }
        }
          
      }
      return result;   
    }
}
  
//addclass函数封装
function addClass(obj,classStr){
  var array = noRepeat(trim(obj.className).split('\s+'));
  if(!inArray(array,classStr)){
    array.push(classStr);
  }
  obj.className = array.join(' ');
  return obj;
}
//removeclass函数封装
function removeClass(obj,classStr){
  var array = noRepeat(trim(obj.className).split('\s+'));
  var index = indexOf(array,classStr);
  if(index != -1){
    array.splice(index,1);
    obj.className = array.join(' ');
  }
  return obj;
}
//toggleClass函数封装
function toggleClass(obj,classStr){
  var array = noRepeat(trim(obj.className).split('\s+'));
  if(inArray(array,classStr)){
    removeClass(obj,classStr);
  }else{
    addClass(obj,classStr);
  }
}