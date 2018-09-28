/**
 * Created by UI on 2018/9/4.
 */
window.onload=function(){
    //1. 获取触发事件的元素
    var formTitle = document.getElementsByClassName("form_title")[0];
    var btns = formTitle.getElementsByTagName("span");
    //2. 为元素绑定事件
    for(var i=0; i<btns.length; i++){
        btns[i].index = i;
        var formBody = document.getElementsByClassName("form_body");
        btns[i].onclick = function(){
            for(var j=0; j<btns.length; j++){
                btns[j].style.borderBottom = "none";
            }
            this.style.borderBottom = "1px solid #54AFDD";
            if(this.index==1){
                formBody[0].style.display = "none";
                formBody[1].style.visibility = "visible";
                formBody[1].style.transform = "translateX(0)";
            }
        }
    }
    //3. 获取要修改的元素
    //4. 修改元素
};
