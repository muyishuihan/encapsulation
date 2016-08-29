ajax({
 
	url: '1.php',
 
　　data: {name: 'ivan', sex: 'male', age: '23'},

　　success: function (data){ alert('返回数据是：' + data); }
 
});
 
ajax({

　　url: '1.php',

　　data: 'name=ivan&sex=male&age=23',

　　cache: false,
 
　　success: function (data){ alert('返回数据是：' + data); }
 
});