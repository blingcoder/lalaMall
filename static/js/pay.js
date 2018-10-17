$(function(){
    if(location.search.indexOf("sku=")!=-1 && location.search.indexOf("num=")!=-1){
        var query = location.search.slice(1);
        var qArr = query.split("&");
        var params = {};
        for(var q of qArr){
            var index = q.split("=")[0];
            params[index] = q.split("=")[1];
        };
        var selNum = $(".info_num>input");
        var num = params.num;
        var price_container = $(".info_price");
        selNum.attr("value",num);
        getAddr();  
        $.ajax({
            url:"http://127.0.0.1:8080/pay",
            type:"get",
            data:`sku=${params.sku}`,
            async:false,
            success:function(result){
                if(result.code==1){
                    $(".info_body div>a").html(result.msg[0].title);
                    $(".info_body div>p>span:first-child").html(result.msg[0].taste);
                    $(".info_body div>p>span:last-child").html(result.msg[0].package);
                    price_container.html(`¥${result.msg[0].onsale_price.toFixed(2)}`);
                    getSum();
                    getTotal();
                }
            }
        });
        //给选择地址绑定点击事件
        var addr = $("#addr>div");
        for(var i=0;i<addr.length;i++){
            $(addr[i]).click(function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                //将选择的收货地址放入确认订单信息中
                getAddr();
            });
        };
        //将选择的收货地址放入确认订单信息中
        function getAddr(){
            var name = $("#addr>div.active>p.font_bold").html().split("<")[0];
            var phone = $("#addr>div.active>p.font_bold>span.small_font").html();
            var address = $("#addr>div.active>p.font_bold+p").html().split("：")[1];
            var targetD = $("#total>div");
            targetD.find("p:nth-child(2)>span.font_bold+span").html(address);
            targetD.find("p:nth-child(3)>span.font_bold+span").html(name);
            targetD.find("p:nth-child(3)>span.font_bold+span+span").html(phone);
        }
        // console.log(name,phone,address);
        //金额随着数量的变化动态改变
        function getSum(){
            var price = parseFloat(price_container.html().slice(1));
            var num = $(".info_num>input").val();
            $(".info_num").next().html(`¥${(price*num).toFixed(2)}`);
        };
        //给购买数量左右两边的按钮绑定点击事件
        var minu = $(".info_num>button:first-child");
        var add = $(".info_num>button:last-child");
        // var sum = $(".info_num").next();
        minu.click(function(){
            var val = selNum.val();
            if(val<=1){
                return;
            }else{
                val--;
                selNum.attr("value",val);
                //金额随着数量的变化动态改变
                getSum();
                getTotal();
            }
        });
        add.click(function(){
            var val = selNum.val();
            val++;
            selNum.attr("value",val);
            //金额随着数量的变化动态改变
            getSum();
            getTotal();
        });
        //定义点击添加红色边框方法
        function addClass(e){
            var $btn = $(e.target);
            if($btn.is("li")){
                $btn.siblings().removeClass("active");
                $btn.addClass("active");
            }else if($btn.is("a")){
                $btn.parent().siblings().removeClass("active");
                $btn.parent().addClass("active");
            };
        };
        //给选择物流方式绑定点击事件
        $("#delivery>div").click(function(e){
            addClass(e);
        });
        //给选择支付方式绑定点击事件
        $("#pay>div").click(function(e){
            addClass(e);
        });
        $("#discount").change(function(){
            getTotal();
        })
        //计算总金额
        function getTotal(){
            //金额
            var sum = parseFloat($(".info_num+li").html().slice(1));
            //快递
            var delivery = parseFloat($(".info_body>ul>li:last-child").html().slice(2));
            //优惠券
            var discount = parseFloat($("#discount").val().slice(1));
            //红包
            var redBag = parseFloat($("#red_bag").val().slice(1));
            //合计
            var total = sum + delivery - discount - redBag;
            $("#total>p>.red_font").html(total.toFixed(2));
            $("#total>div>p>span.red_font").html(total.toFixed(2));
        };
        //给提交订单按钮绑定点击事件
        $("#total>button").click(function(){
            //确认总金额数字的格式正确(*.**~******.**)
            var reg = /^[0-9]{1,6}\.[0-9]{2}/;
            var shouldPay = $("#total>p>.red_font").html();
            if(reg.test(shouldPay)){
                location.href = "success.html?shouldpay="+shouldPay;
            }
        })
    }
})