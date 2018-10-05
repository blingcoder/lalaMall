$(function(){
    // 放大镜效果
    var mask = $("#mask"),
        lg_div = $("#lg_div");
    $("#super_mask").hover(function(){
        mask.toggle(); 
        lg_div.toggle();
    }).mousemove(function(e){
        var Min = 200,
            box = 400,
            Max = box - Min;
        var left = e.offsetX - Min/2;
        var top = e.offsetY - Min/2;
        if(left<0){
            left = 0;
        }else if(left>Max){
            left = Max;
        }
        if(top<0){
            top = 0;
        }else if(top>Max){
            top = Max;
        }
        mask.css({
            left,
            top
        })
        lg_div.css("backgroundPosition", `-${2*left}px -${2*top}px`);
    })
    // 左右箭头控制小图标左右移动
    var arrowL = $("#arrowL"),
        arrowR = $("#arrowR");
    var imgs = arrowL.next().children();
    var moved = 0,
        minWidth = 70;
    arrowR.click(function(){
        if(!arrowR.is(".disabled")){
            moved++;
            imgs.css({
                "left": -moved*minWidth,
                "transition": "all linear .3s"
            });
            arrowL.removeClass("disabled");
            if(imgs.children().length-5==moved){
                arrowR.addClass("disabled");
            }
        }
    })
    arrowL.click(function(){
        if(!arrowL.is(".disabled")){
            moved--;
            imgs.css({
                "left": -moved*minWidth,
                "transition": "all linear .3s"
            });
            arrowR.removeClass("disabled");
            if(moved==0){
                arrowL.addClass("disabled");
            }
        }
    })
    var md_div = $("#md_div");
    // 鼠标移入小图，中图和大图切换到对应的
    imgs.mouseover(function(e){
        var $img = $(e.target);
        if(e.target.nodeName=="IMG")
        var str = $img.prop("src");
        var num = parseInt(str.slice(-11));
        md_div.children().prop("src",`img/0${num}_mid.jpg`);
        // lg_div.css("backgroundImage",`url("file:///D:/12vsc_workspace/lalaMall/static/img/0${num}.jpg")`);
    })

    // 口味、包装选择
    var taste = $("#taste"),
        pack = $("#pack");
    function select(e){
        var $sel = $(e.target);
        if($sel.is("li")){
            $sel.siblings().removeClass("active");
            $sel.addClass("active");
        }
    }
    taste.on("click",select);
    pack.on("click",select);
    // 数量点击增减
    var numb = $("#num"),
        minu = numb.children("span:eq(0)"),
        selNum = numb.children("input"),
        val = selNum.val(),
        add = numb.children("span:eq(1)"),
        store = numb.children("span:last").children(),
        leftC = parseInt(store.html());
        minu.click(function(){
            if(selNum.val()<=1){
                return;
            }else{
                val--;
                selNum.val(val);
                leftC++;
                store.html(leftC);
            }
        })
        add.click(function(){
            val++;
            selNum.val(val);
            leftC--;
            store.html(leftC);
        })

    
    var details_title = $("#details_title");
    // 宝贝详情、全部评价、猜你喜欢点击切换
    details_title.click(function(e){
        e.preventDefault();
        var top = $("#details_right").offset().top;
        $(document).scrollTop(top);
        $title = $(e.target);
        if($title.is("a")){
            $title.parent().siblings().children().removeClass("active");
            $title.addClass("active");
            var id = $title.attr("data-target"),
                intro = $("#intro"),
                comments = $("#comments"),
                prefer = $("#prefer");
            if(id!="#comments"){
                comments.removeClass("hideL").removeClass("hideR");
                if(id=="#intro"){
                    comments.addClass("hideR");
                    prefer.addClass("hide");
                }else if(id=="#prefer"){
                    comments.addClass("hideL");
                    intro.addClass("hide");
                }
                $(id).siblings().removeClass("show");
                $(id).removeClass("hide").addClass("show");
            }else{
                $(id).siblings().removeClass("show").addClass("hide");
                if($(id).hasClass("hideR")){
                    $(id).removeClass("hideR").addClass("show");
                }else{
                    $(id).removeClass("hideL").addClass("show");
                }
            }
        }
    });
    
    // 固定宝贝详情title的位置
    $(window).scroll(function(){
        var toTop = details_title.offset().top-$(document).scrollTop();
        if(toTop<=0){
            details_title.addClass("fixed");
            details_title.css("left",details_title.offset().left);
        }
        if($("#details_content").offset().top-$(document).scrollTop()>=0){
            details_title.removeClass("fixed");
        }
    })
    
    

})