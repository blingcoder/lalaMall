$(function(){
    //生成link标签并追加到index.heml head里
    $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo($("head"));
    $.ajax({
        //请求获取头部
        url:"header.html",
        type: "get",
        success: function(res){
            $(res).replaceAll($("#header"));
            //获取搜索按钮和输入框
            $btn = $("[type=button]");
            $input = $("[type=text]");
            $btn.click(function(){
                var reg = /^\s+/;
                var kw = $input.val();
                if(kw.length>0 && !reg.test(kw)){
                    location.href = `products.html?kw=${kw}`;
                }
            })
            $input.keyup(function(e){
                if(e.keyCode==13){
                    $btn.click();
                }
            })
        }
    })
});