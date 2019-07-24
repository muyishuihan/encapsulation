
//方案1
//这个模块完成鼠标方向判断的功能
var MouseDirection = function (element, opts) {

    var $element = $(element);

    //enter leave代表鼠标移入移出时的回调
    opts = $.extend({}, {
        enter: $.noop,
        leave: $.noop
    }, opts || {});

    var dirs = ['top', 'right', 'bottom', 'left'];

    var calculate = function (element, e) {
        /*以浏览器可视区域的左上角建立坐标系*/

        //表示左上角和右下角及中心点坐标
        var x1, y1, x4, y4, x0, y0;

        //表示左上角和右下角的对角线斜率
        var k;

        //用getBoundingClientRect比较省事，而且它的兼容性还不错
        var rect = element.getBoundingClientRect();

        if (!rect.width) {
            rect.width = rect.right - rect.left;
        }

        if (!rect.height) {
            rect.height = rect.bottom - rect.top;
        }

        //求各个点坐标 注意y坐标应该转换为负值，因为浏览器可视区域左上角为(0,0)，整个可视区域属于第四象限
        x1 = rect.left;
        y1 = -rect.top;

        x4 = rect.left + rect.width;
        y4 = -(rect.top + rect.height);

        x0 = rect.left + rect.width / 2;
        y0 = -(rect.top + rect.height / 2);

        //矩形不够大，不考虑
        if (Math.abs(x1 - x4) < 0.0001) return 4;

        //计算对角线斜率
        k = (y1 - y4) / (x1 - x4);

        var range = [k, -k];

        //表示鼠标当前位置的点坐标
        var x, y;

        x = e.clientX;
        y = -e.clientY;

        //表示鼠标当前位置的点与元素中心点连线的斜率
        var kk;

        kk = (y - y0) / (x - x0);

        //如果斜率在range范围内，则鼠标是从左右方向移入移出的
        if (isFinite(kk) && range[0] < kk && kk < range[1]) {
            //根据x与x0判断左右
            return x > x0 ? 1 : 3;
        } else {
            //根据y与y0判断上下
            return y > y0 ? 0 : 2;
        }
    };

    $element.on('mouseenter', function (e) {
        var r = calculate(this, e);
        opts.enter($element, dirs[r]);
    }).on('mouseleave', function (e) {
        var r = calculate(this, e);
        opts.leave($element, dirs[r]);
    });
};



//方案2
 $(".works-img").bind("mouseenter mouseleave",function(e) {
        var w = $(this).width();
        var h = $(this).height();

        var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);

        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
        
        var eventType = e.type;

        var dirName = new Array('上方','右侧','下方','左侧');

        if(e.type == 'mouseenter'){
            $("#result").html(dirName[direction]+'进入');
        }else{
            $('#result').html(dirName[direction]+'离开');
        }
  });



//方案3
//采用模块模式来封装代码，可以方便发布成为spm包，方便今后引用。
var wen_direction = (function () {
    var jqDirection;
    function Direction(id) {
        this.id = document.getElementById(id) || id ;
    }
    Direction.prototype.init = function (enterObj, leaveObj) {
        //鼠标滑入元素
        var self = this;
        this.id.addEventListener('mouseenter', function (e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方进入， 返回1:右方进入，返回2：下方进入，返回3：左方进入
            var funArray = [enterObj.top, enterObj.right, enterObj.bottom, enterObj.left];
            funArray[directionNumber](self.id);
        },false);
        this.id.addEventListener('mouseleave', function (e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方离开， 返回1:右方离开，返回2：下方离开，返回3：左方离开
            var funArray = [leaveObj.top, leaveObj.right, leaveObj.bottom, leaveObj.left];
            funArray[directionNumber](self.id);
        },false);
    };
    /*主函数 返回数字来判断从哪个方向进入*/
    Direction.prototype.main = function (e) {
        var w = this.id.scrollWidth;
        var h = this.id.scrollHeight;
        var x = (e.offsetX - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.offsetY - (h / 2)) * (h > w ? (w / h) : 1);
        var number = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        return number;
    };
    /*基于jquery的事件对象*/
    Direction.prototype.jqRun=function(e) {
        var directionNumber = this.jqMain(e);
        var obj = {};
        switch(directionNumber)
        {
            case 0://from top
                obj.left = 0;
                obj.top = "-100%";
                break;
            case 1://from right
                obj.left = "100%";
                obj.top = 0;
                break;
            case 2://from bottom
                obj.left = 0;
                obj.top = "100%";
                break;
            case 3://from left
                obj.left = "-100%";
                obj.top = 0;
                break;
        }
        return obj;
    };
    Direction.prototype.jqMain = function (e) {
        var w = this.id.width();
        var h = this.id.height();
        /*计算x和y得到一个角到elem的中心，得到相对于x和y值到div的中心*/
        var x = (e.pageX - this.id.offset().left - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - this.id.offset().top - (h / 2)) * (h > w ? (w / h) : 1);
        /** 鼠标从哪里来 / 角度 和 方向出去顺时针（得出的结果是TRBL 0 1 2 3
         * 首先计算点的角度，
         * 再加上180度摆脱负值
         * 除于90得到的象限（象限，又称象限角，意思就是一个圆之四分之一等份）
         * 加上3，做一个模（求模 求余数）4的象限转移到一个适当的顺时针 得出 TRBL 0 1 2 3（上/右/下/左）
         **/
        var number = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        return number;
    };
    return {
        run: function (id, enterObj, leaveObj) {//这个接口用于原生js
            var directionChild = new Direction(id);
            directionChild.init(enterObj, leaveObj);
        },
        jqRun: function(id, e){//暴露的这个接口是基于jquery的
            if(!jqDirection){
                jqDirection = new Direction(id);
            }
            return jqDirection.jqRun(e);//返回一个样式对象{left：string，top：string}
        }
    }
})();







