$(function(){
    //生成link标签并追加到index.heml head里
    $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo($("head"));
    $.ajax({
        //请求获取头部
        url:"header.html",
        type: "get",
        success: function(res){
            //var header = $("#header");
            //if(header[0].className == "container_small"){
            //    res = res.replace(/container/,"container_small");
            //}
            $(res).replaceAll($("#header"));
            //获取搜索按钮和输入框
            $btn = $("[type=button]");
            $input = $("[type=text]");
            $btn.click(function(){
                if($input.val().length>0){
                    location.href = "search.html";
                }
            })
        }
    })
});