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
    var count = 0,
        minWidth = 70;
    arrowR.click(function(){
        count++;
        imgs.css({
            "left": -count*minWidth,
            "transition": "all linear .3s"
        });
    })

    $("#details_item").click();

})