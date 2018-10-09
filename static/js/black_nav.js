$(function(){
    $(`<link rel="stylesheet" href="css/black_nav.css"/>`).appendTo($("head"));
    $.ajax({
        url:"black_nav.html",
        type:"get",
        success:function(result){
            $(result).replaceAll($("#black_nav"));
        }
    })
})