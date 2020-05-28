window.onload = function(){
    var oBall = document.getElementById('ball');
    var oDiv = document.getElementById('div1');
    var oBat = document.getElementById('bat');
    var oBrick = document.getElementById('brick');
    var aBricks = oBrick.getElementsByTagName('div');
    var speedX = parseInt(Math.random()*4) + 4;//随机3~6的随机速度
    var speedY = -(parseInt(Math.random()*3) + 6);
    
    dragX(oBat);
    createBrick(60);
    setInterval(function(){
        
        oBall.style.left = oBall.offsetLeft + speedX + 'px';
        oBall.style.top = oBall.offsetTop + speedY + 'px';
        
        if(oBall.offsetLeft >= 980 || oBall.offsetLeft <= 0){
            speedX *= -1;
        }
        if(oBall.offsetTop <= 0){
            speedY *= -1;
        }
        if(oBall.offsetTop >= 480){
            alert("Game over!!!");
            window.location.reload();
        }
        
        //进行碰撞检测
        //和拍子碰撞
        if(konck(oBall, oBat)){
            speedY *= -1;
        }
        for(var i = 0; i < aBricks.length; i++){
            if(konck(aBricks[i], oBall)){
                speedY *= -1;
                oBrick.removeChild(aBricks[i]);
                break;
            }
        }
    }, 30)
}
//封装一个拖拽的函数
function dragX(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        
        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            if(l <= 0){
                l = 0;
            }
            if(l >= 896){
                l = 896;
            }
            node.style.left = l + 'px';
        }
    }
        document.onmouseup = function(){
        document.onmousemove = null;
    }
}

//创建砖块
function createBrick(n){
    
    for(var i = 0; i < n; i++){
        var oBrick = document.getElementById('brick');
        var node = document.createElement('div');
        node.style.background = randomColor();
        oBrick.appendChild(node);
    }
    var aBricks = oBrick.getElementsByTagName('div');
    for(var i = 0; i < aBricks.length; i++){
        aBricks[i].style.left = aBricks[i].offsetLeft + 'px';
        aBricks[i].style.top = aBricks[i].offsetTop + 'px';
        
        
    }
    for(var i = 0; i < aBricks.length; i++){
        aBricks[i].style.position = 'absolute';
    }
}
function randomColor(){
    var str = "rgba(" + parseInt(Math.random()*256) + "," + parseInt(Math.random()*256) + "," + parseInt(Math.random()*256) + ")";
    return str;
}
//封装碰撞函数
function konck(node1, node2){
    var l1 = node1.offsetLeft;
    var r1 = node1.offsetLeft + node1.offsetWidth;
    var t1 = node1.offsetTop;
    var b1 = node1.offsetTop + node1.offsetHeight;
    
    var l2 = node2.offsetLeft;
    var r2 = node2.offsetLeft + node2.offsetWidth;
    var t2 = node2.offsetTop;
    var b2 = node2.offsetTop + node2.offsetHeight;
    
    if(l2 > r1 || r2 < l1 || t2 > b1 || b2 < t1){
        return false;
    }else{
        return true;
    }
}