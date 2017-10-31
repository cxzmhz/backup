/**
 * Created by Administrator on 2017/7/1.
 */
/**
 *用于获取某特定id名的元素
 * @param string id
 * @returns {Element}
 */
function id(id){
    return document.getElementById(id);
}


/**
 * 用于获取某一类名的元素对象
 * @param tagName 为Array，数组中为标签名
 * @param className 为String
 * @returns {Array}
 */
function getElementsByClassName(tagName,className){
    var arr1=[];
    for (var i=0;i<tagName.length;i++){
        var arr2=document.getElementsByTagName(tagName[i]);
        for(var j=0;j<arr2.length;j++){
            if(arr2[j].className==className){
                arr1[arr1.length]=arr2[j];
            }
        }
    }
    return arr1;
}


/**
 * 封装一个函数，获取元素的文本；
 * @param ele 要获取文本的元素
 * @returns {*} 返回获取到的文本
 */
function getText(ele){
    if (typeof ele.textContent=="string"){
        return ele.textContent;
    }else{
        return ele.innerText;
    }
}


/**
 * 封装一个函数，设置元素的文本；
 * @param ele   要设置文本的元素
 * @param text string  要设置的文本
 */
function setText(ele,text){
    if(typeof ele.textContent=="string"){
        ele.textContent=text;
    }else{
        ele.innerText=text;
    }
}

/**
 * 获取下一个兄弟节点
 * @param ele
 * @returns {*}
 */
function getNextElement(ele){
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }else {
        var node = ele.nextSibling;
        while(node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}


/**
 * 获取上一个兄弟节点
 * @param ele
 * @returns {*}
 */
function getPreviousElement(ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }else {
        var node = ele.previousSibling;
        while(node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}


/**
 * 获取第一个子节点
 * @param ele
 * @returns {*}
 */
function getFirstElementChild(ele){
    if(ele.firstElementChild){
        return ele.firstElementChild;
    }else {
        var node = ele.firstChild;
        while(node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}


/**
 * 获取最后一个子节点
 * @param ele
 * @returns {*}
 */
function getLastElementChild(ele){
    if(ele.lastElementChild){
        return ele.lastElementChild;
    }else {
        var node = ele.lastChild;
        while(node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}

/**
 * 事件添加程序
 * @param ele 元素节点（事件源）
 * @param eve（string） 事件
 * @param func 事件执行程序
 */
function eventListener(ele,eve,func){
    if(ele.addEventListener){
        ele.addEventListener(eve,func,false);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+eve,func);
    }else{
        ele["on"+eve]=func;
    }
}

/**
 *
 * @param ele
 * @param json
 * @param func
 */
function animate(ele,json,func){
    clearInterval(ele.timerId);
    ele.timerId=setInterval(function(){
        var flag=true;
        for (var key in json){
            if (key=="opacity"){
                var current=+getStyle(ele,key);
                var step=(json[key]-current)*10;
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step/100;
                ele.style[key]=current;
            }
            else if(key=="zIndex"){
                var current=+getStyle(ele,key)||0;
                if(current!=json[key]){
                    var step=(json[key]-current)>0?1:-1;
                    current+=step;
                    ele.style[key]=current;
                }
            }
            else{
                var current=parseInt(getStyle(ele,key));
                var step=(json[key]-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                ele.style[key]=current+"px";
            }
            if (current!=json[key]){
                flag=false;
            }
        }
        if(flag){
            clearInterval(ele.timerId);
            if(typeof(func)=="function"){
                func();
            }
        }
    },30)
}


/**
 *
 * @param ele
 * @param attr
 * @returns {*}
 */
function getStyle(ele,attr){
    if (ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return window.getComputedStyle(ele,null)[attr];
    }
}

/**
 * 页面滚动的距离
 * @returns {{scrollLeft: (Number|number), scrollTop: (Number|number)}}
 */
function scroll(){
    return {
        scrollLeft:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    }
}

/**
 * 获取页面可视窗口的宽高
 * @returns {{clientWidth: (Number|number), clientHeight: (Number|number)}}
 */
function getClient(){
    return {
        clientWidth:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0,
        clientHeight:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0
    }
}

/**
 * 获取鼠标指针在页面内容区域的位置；
 * @param e
 * @returns {{pageX: (Number|number), pageY: (Number|number)}}
 */
function getPage(e){
    e=e||window.event;
    return {
        pageX: e.pageX|| e.clientX+document.documentElement.scrollLeft,
        pageY: e.pageY|| e.clientY+document.documentElement.scrollTop
    }
}

/**
 * 添加事件兼容
 * @param ele
 * @param event
 * @param listener
 */
function addEventListener(ele,event,listener){
    if(ele.addEventListener){
        ele.addEventListener(event,listener,false);
    }
    else if(ele.attachEvent){
        ele.attachEvent("on"+event,listener);
    }
    else {
        ele["on"+event]=listener;
    }
}

/**
 * 移除事件兼容
 * @param ele
 * @param event
 * @param listener
 */
function removeEventListener(ele,event,listener){
    if(ele.removeEventListener){
        ele.removeEventListener(event,listener,false);
    }
    else if(ele.detachEvent){
        ele.detachEvent("on"+event,listener);
    }
    else {
        ele["on"+event]=null;
    }
}

/**
 * 阻止事件冒泡
 * @param e
 */
function stopPropagation(e){
    e=e||window.event;
    if (e.stopPropagation){
        e.stopPropagation();
    }
    else {
        e.cancelBubble=true;
    }
}

//阻止事件默认行为
function stopDefault(e) {
     // 阻止默认浏览器动作(W3C)
     if ( e && e.preventDefault ) {
         e.preventDefault();
     } else {
         // IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
}