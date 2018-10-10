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
        $.ajax({
            url:"http://127.0.0.1:8080/pay",
            type:"get",
            data:`sku=${params.sku}`,
            success:function(result){
                if(result.code==1){
                    $(".info_body div>a").html(result.msg[0].title);
                    $(".info_body div>p>span:first-child").html(result.msg[0].taste);
                    $(".info_body div>p>span:last-child").html(result.msg[0].package);
                    price_container.html(`¥${result.msg[0].onsale_price.toFixed(2)}`);
                    getSum();
                }
            }
        })
        //金额随着数量的变化动态改变
        function getSum(){
            var price = parseFloat(price_container.html().slice(1));
            var num = $(".info_num>input").val();
            $(".info_num").next().html(`¥${(price*num).toFixed(2)}`);
        }
        //为购买数量左右两边的按钮绑定点击事件
        var minu = $(".info_num>button:first-child");
        var add = $(".info_num>button:last-child");
        var sum = $(".info_num").next();
        minu.click(function(){
            var val = selNum.val();
            if(val<=1){
                return;
            }else{
                val--;
                selNum.attr("value",val);
                //金额随着数量的变化动态改变
                getSum();
            }
        })
        add.click(function(){
            var val = selNum.val();
            val++;
            selNum.attr("value",val);
            //金额随着数量的变化动态改变
            getSum();
        })
    }
})