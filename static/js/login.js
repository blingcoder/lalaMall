$(function(){
    $("[type=button]").click(function(){
        var btn = $(this);
        btn.val("正在登录...");
        var uname = $("[name=uname]").val();
        var upwd = $("[name=upwd]").val();
        $.ajax({
            url:"http://127.0.0.1:8080/user/login",
            type:"post",
            data:`uname=${uname}&upwd=${upwd}`,
            success:function(res){
                if(res.code == 1){
                    location.href = "http://127.0.0.1:8080/index.html";
                }else if(res.code == -3){
                    $(".err").css("z-index",11);
                    btn.val("登录");
                }
            },
            error:function(err){
                console.log(err);
            }
        })
    })
})