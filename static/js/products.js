$(function(){
    var pno = 0;
    function loadPage(pno=0){
        if(location.search.indexOf("kw=")!=-1){
            var kw = location.search.split("=")[1].split("&")[0];
            $.ajax({
                url:"http://127.0.0.1:8080/products",
                type:"get",
                async:false,
                data:{kw,pno},
                success:function(result){
                    console.log(result);
                    var {pros,pno,pageCount} = result;
                    //加载商品列表
                    var html = "";
                    for(var p of pros){
                        html += `
                            <li>
                                <div class="pro">
                                    <a href="pro_details.html?sku=${p.sku}" data-sku="${p.sku}">
                                        <img src="${p.md}"/>
                                    </a>
                                    <a href="pro_details.html?sku=${p.sku}" data-sku=${p.sku}>
                                        <p>【良品铺子旗舰店】${p.title}/${p.taste}/${p.package}</p>
                                    </a>
                                    <p>
                                        <span class="red">¥ ${p.onsale_price}</span>
                                        <span class="sold">销量${p.sold}</span>
                                    </p>
                                    </a>
                                </div>
                            </li>
                        `;
                    }
                    $("#left_pro>div:eq(1)>ul").html(html);
                    //分页
                    var html = "";
                    html += `<li><a href="#" class="${pno==0?'disabled':''}">«</a></li>`;
                    for(var i=1; i<=pageCount; i++){
                        html += `<li><a class="${pno==i-1?'active':''}" href="#">${i}</a></li>`;
                    }
                    html += `<li><a href="#" class="${pno==pageCount-1?'disabled':''}">»</a></li>`;
                    var page = $("div.pagination>ul");
                    page.html(html);
                    // if(pno==0){page.children(":first").addClass("disabled")};
                    // if(pno==pageCount-1){page.children(":last").addClass("disabled")};
                }
            })
        };
    };
    loadPage();
    $(".pagination").on("click","a",function(e){
        e.preventDefault();
        var $a = $(this);
        if(!$a.is(".disabled,.active")){
            if($a.html() == "«"){
                pno--;
            }else if($a.html() == "»"){
                pno++;
            }else{
                pno = $a.html()-1;
            }
        };
        loadPage(pno);
    });
})