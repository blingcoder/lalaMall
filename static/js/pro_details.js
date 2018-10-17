$(function(){
    if(location.search.indexOf("sku=")!=-1){
        // var url = location.href.split("=")[0];
        var sku = location.search.split("=")[1];
        // 动态获取大中小图
        $.ajax({
            url:"http://127.0.0.1:8080/details",
            type:"get",
            data:`sku=${sku}`,
            dataType:"json",
            async:false,
            success:function(res){
                // console.log(res);
                if(res.code==1){
                    var {product,tastes,packages,pics,specs,skuInfo} = res.msg;
                    var {title,discount_msg,month_sold,total_sold,total_comments,taste,package,onsale_price,origin_price} = product;
                    $("#top_right>h3").html(title);
                    // 店铺优惠
                    var html = `<span class="light_gray">店铺优惠</span>
                    <span class="light_red bold_font top_font space">${discount_msg}</span>
                    <span class="light_red bold_font top_font">点击领券</span>`;
                    $("#top_right>h3+div>p").html(html);
                    // 销量
                    var html = `<a href="#">月销量<span class="dark_red">${month_sold}</span></a>
                    <a href="#">累计销量<span class="dark_red">${total_sold}</span></a>
                    <a href="#">累计评价<span class="dark_red">${total_comments}</span></a>`;
                    $("#sold").html(html);
                    // 口味
                    var html = ``;
                    for(var t of tastes){
                        html += `<li class="${taste==t.taste?'active':''}">${t.taste}</li>`;
                    }
                    $("#taste>ul").html(html);
                    // 包装
                    var html = ``;
                    for(var p of packages){
                        html += `<li class="${package==p.package?'active':''}">${p.package}</li>`;
                    }
                    $("#pack>ul").html(html);
                    //获取口味和包装信息保存到隐藏的input中
                    var input_hidden = $("#selected>input");
                    input_hidden.attr("data-sku",`${sku}`);
                    var newP_container = $("#onsale_price>p:first-child>span:last-child"),
                        oldP_container = $("#onsale_price>p:last-child>span:last-child");
                    //促销价和原价
                    $("#onsale_price>p:first-child>span:last-child").html(onsale_price.toFixed(2));
                    $("#onsale_price>p:last-child>span:last-child").html("¥"+origin_price.toFixed(2));
                    // 口味、包装点击后判断是否都已选
                    var taste = $("#taste"),
                        pack = $("#pack");
                    // 把所选的商品规格的sku信息保存到input标签中
                    function getActive(){
                        var taste_active = $("#taste>ul>li[class=active]");
                        var pack_active = $("#pack>ul>li[class=active]");
                        if(taste_active && pack_active){
                            var taste = taste_active.html();
                            var pack = pack_active.html();
                            // alert(taste,pack);
                            var new_price = 0,
                                old_price = 0;
                            for(var s of specs){
                                if(taste == s.taste && pack == s.package){
                                    sku = s.sku;
                                    new_price = s.onsale_price;
                                    old_price = s.origin_price;
                                    // location.href = url + "=" + sku;
                                    input_hidden.attr({
                                        "data-sku":`${sku}`,
                                        "data-onsale-price":`${new_price}`,
                                        "data-origin-price":`${old_price}`
                                    });
                                    break;
                                }
                            }
                        }
                    }
                    // 点击不同的规格出现不同的价格
                    function getPrice(){
                        if(input_hidden.attr("data-onsale-price")){
                            newP_container.html(`${Number(input_hidden.attr("data-onsale-price")).toFixed(2)}`);
                            oldP_container.html(`¥${Number(input_hidden.attr("data-origin-price")).toFixed(2)}`);
                        }
                    }
                    // 分别给口味和包装绑定一样的点击事件
                    taste.on("click",function(e){
                        select(e);
                        getActive();
                        getPrice();
                    });
                    pack.on("click",function(e){
                        select(e);
                        getActive();
                        getPrice();
                    })
                    // 解析并处理请求到的大中小图片
                    var html = ``;
                    for(var p of pics){
                        var {sm,md,lg} = p;
                        html += `<li><img src="${sm}" data-md="${md}" data-lg="${lg}"/></li>`;
                    }
                    $("#arrowL+div>ul").html(html);
                    // 鼠标移入小图，切换到对应的中图和大图
                    // 获取小图列表和左右两边的箭头
                    var arrowL = $("#arrowL");
                    var imgs = arrowL.next().children();
                    var md_div = $("#md_div");
                    imgs.mouseover(function(e){
                        var $img = $(e.target);
                        if($img.is("img")){
                            var md_pic = $img.attr("data-md");
                            var lg_pic = $img.attr("data-lg");
                            // var num = parseInt(str.slice(-11));
                            md_div.children().prop("src",`${md_pic}`);
                            lg_div.css("backgroundImage",`url("${lg_pic}")`);
                        }
                    })
                }
            }
        })
    }
    
    // 口味、包装点击后改变样式
    function select(e){
        var $sel = $(e.target);
        if($sel.is("li")){
            $sel.siblings().removeClass("active");
            $sel.addClass("active");
        };
    }
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
    // 获取小图列表和左右两边的箭头
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
    
    // 数量点击增减
    var numb = $("#num"),
        minu = numb.children("span:eq(0)"),
        selNum = numb.children("input"),
        add = numb.children("span:eq(1)");
        minu.click(function(){
            var val = selNum.val();
            if(val<=1){
                return;
            }else{
                val--;
                selNum.attr("value",val);
            }
        })
        add.click(function(){
            var val = selNum.val();
            val++;
            selNum.attr("value",val);
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

    // 给立即购买按钮绑定页面跳转事件并传参
    $("#immeBuy").click(function(){
        var data = $("input[type=hidden]").attr("data-sku");
        var num = $("#num>input").val();
        $.ajax({
            url:"http://127.0.0.1:8080/details/pay",
            type:"get",
            data:`sku=${data}`,
            success:function(result){
                // console.log(result);
                if(result.code==1){
                    location.href=`pay.html?sku=${result.msg[0].sku}&num=${num}`;
                }
            }
        })
    })
})