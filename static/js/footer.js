$(function(){
    $(`<link rel="stylesheet" href="css/footer.css"/>`).appendTo($("head"));
    $.ajax({
        url: "footer.html",
        type: "get",
        success: function(res){
            var footer = $("#footer");
            if(footer[0].className == "container_small"){
                res = res.replace(/container/, "container_small");
            }
            $(res).replaceAll(footer);
        }
    })
});