$(function(){
    //轮播
    //获取轮播图的相框
    var showImg = document.getElementById('wrapper');
    //获取装四张轮播图的ul
    var imgUl = showImg.getElementsByTagName('ul')[0];
    //获取轮播图下方四个圆点
    var cirs = showImg.getElementsByTagName('ul')[1].getElementsByTagName('a');
    //获取左右两个箭头
    var left = document.getElementById('left_arrow');
    var right = document.getElementById('right_arrow');
    var clickFlag = true;//设置左右切换标记的位置放置连续点击
    var time;//自动滑动的计时器
    var index = 0;//记录每次滑动图片的下标
    var Distance = showImg.offsetWidth;//获取展示区的宽度，即每张图片的宽度
    //定义图片滑动函数
    function autoGo(){
        var start = imgUl.offsetLeft;
        var end = index*Distance*(-1);
        var change = end - start;
        var timer;
        var t = 0;
        var maxT = 30;
        clear();
        if(index==cirs.length){
            cirs[0].className = 'selected';
        }else{
            cirs[index].className = 'selected';
        }
        clearInterval(timer);
        timer = setInterval(function(){
            t++;
            if(t>=maxT){
                clearInterval(timer);
                clickFlag = true;
            }
            imgUl.style.left = (change/maxT)*t + start + 'px';
            if(index == cirs.length && t>= maxT){
                imgUl.style.left = 0;
                index = 0;
            }
        }, 17)
    }
    //编写图片向右滑动函数
    function forward(){
        index++;
        if(index>cirs.length){
            index = 0;
        }
        autoGo();
    }
    //编写图片向左滑动函数
    function backward(){
        index--;
        if(index<0){
            index = cirs.length - 1;
            imgUl.style.left = (index+1)*Distance*(-1) + 'px';
        }
        autoGo()
    }
    //开启图片自动向右滑动的计时器
    time = setInterval(forward, 3000);

    //设置鼠标悬停动画停止
    showImg.onmouseover = function(){
        clearInterval(time);
    };
    showImg.onmouseout = function(){
        time = setInterval(forward, 3000);
    };
    //遍历每个按钮让其切换到对应图片
    for(var i=0; i<cirs.length; i++){
        cirs[i].num = i;
        cirs[i].onclick = function(){
            index = this.num;
            autoGo();
        }
    }
    //左切换事件
    left.onclick = function(){
        if(clickFlag){
            backward();
        }
        clickFlag = false;
    };
    //右切换事件
    right.onclick = function(){
        if(clickFlag){
            forward();
        }
        clickFlag = false;
    };
    //清除页面所有的按钮状态颜色
    function clear(){
        for(var i=0; i<cirs.length; i++){
            cirs[i].className = '';
        }
    }


    //动态给头部垂直黑色列表右侧的白色列表添加top
    var $item = $(".left_title .lc_item");
    $item.each(function(i,elem){
        $(this).css("top",-33*i-i);
    });
    //头部左侧黑色导航栏鼠标悬浮效果
    $li = $(".left>.left_title>li");
    $li.on("mouseenter","div:first-child",function(){
        $bDiv = $(this);
        //li里黑色背景div背景色的变化与恢复
        $bDiv
            .addClass("hover")
            .parent()
            .siblings()
            .children(":first-child")
            .removeClass("hover");
        //li里黑色背景div里字体颜色的变化与恢复
        $bDiv
            .children("a")
            .addClass("hover")
            .parent()
            .parent()
            .siblings()
            .children(":first-child")
            .children("a")
            .removeClass("hover");
        //黑色导航栏右侧白色div的显示与隐藏
        $wDiv = $bDiv.next();
        $wDiv
            .show()
            .parent()
            .siblings()
            .children(".lc_item")
            .hide();
    });
    $li.on("mouseleave",function(){
        $bDiv = $(this).children(":first-child");
        $bDiv
            .removeClass("hover")
            .children("a")
            .removeClass("hover");
        $wDiv = $bDiv.next();
        $wDiv.hide();
    });

    //动态加载爆款特卖
    (async function(){
        //获取top_seller_onsale所有对象
        var res = await ajax({
            url:"http://127.0.0.1:8080/index/top_seller_onsale",
            type:"get",
            dataType:"json"
        });
        //console.log(res);
        //遍历并加载res里的所有商品
        var html = "";
        for(var pro of res){
            var {title,price,ad_img} = pro;
            html += `<li>
                        <a href="#"><img src="${ad_img}"/></a>
                        <a href="#">${title}</a>
                        <div>
                            <span>¥</span><span>${price.toFixed(2)}</span>
                            <button>秒杀</button>
                        </div>
                    </li>`;
        }
        document.querySelector(".onSale_list").innerHTML = html;
    }());

    //动态给头部垂直黑色列表右侧的白色列表添加top
    //var $item = $(".left_title .lc_item");
    //console.log($item);
    //$item.each(function(i,elem){
    //    $(this).css("top",-33*i-i);
    //});
    ////头部左侧黑色导航栏悬浮效果
    //console.log($("ul.left_title>li>div:first"));
    //$("ul.left_title>li").on("mouseenter","#bb",function(){
    //    //alert("aaa");
    //    $bDiv = $(this);
    //    $bDiv.addClass("hover");
    //    $bDiv.children("a").addClass("hover");
    //});
})