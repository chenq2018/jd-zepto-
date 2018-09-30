/**
 * Created by lenovo on 2018/8/29.
 */
//尽量不使用jQuery
window.onload = function(){
    //顶部搜索栏渐变效果
    topColor();

    //轮播图
    banner();

    //时间倒计时
    getTime();
};

//顶部渐变
function topColor(){
    //顶部透明效果
    var jd_searchBox = document.querySelector(".jd_searchBox");
    var jd_banner = document.querySelector(".jd_banner");
    //滚动事件
    window.onscroll = function(){
        //当前页面滚动距离
        //var top = document.body.scrollTop;
        //谷歌计算滚动距离方法
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        var opacity;
        if(top >= jd_banner.offsetHeight - jd_searchBox.offsetHeight){
            opacity = 1;
        } else {
            opacity = (top / jd_banner.offsetHeight) * 1;
        }
        jd_searchBox.style.backgroundColor = "rgba(216,80,92,"+ opacity +")";
    }
}

//轮播图
function banner(){
    //函数封装
    function getTransition(){
        //设置过渡
        bannerUl.style.transition = "all 1.5s";
        //兼容写法
        bannerUl.style.webkitTransition = "all 1.5s";
    }

    function setTransform(){
        //设置位移
        bannerUl.style.transform = "translateX("+ (-index * bannerWidth) + 'px' +")";
        //兼容写法
        bannerUl.style.webkitTransform = "translateX("+ (-index * bannerWidth) + 'px' +")";
    }

    function removeTransitionend(){
        //清除过渡，为了瞬间移动到第一张
        bannerUl.style.transition = "none";
        //兼容写法
        bannerUl.style.webkitTransition = "none";
    }

    //无缝滚动
    //定义index
    var index = 1;
    //获取dom元素
    var jd_banner = document.querySelector(".jd_banner");
    var bannerUl = document.querySelector(".bannerUl");
    var bannerWidth = jd_banner.offsetWidth;
    var lis = document.querySelectorAll(".bannerUl > li");
    var points = document.querySelectorAll(".circle > li");

    //当window窗口改变大小时
    window.onresize = function(){
       //重新获取banner宽度和ul、li宽度
       bannerWidth = jd_banner.offsetWidth;
       bannerUl.style.width = lis.length * bannerWidth + 'px';
       for(var i = 0; i < lis.length; i++){
            lis[i].style.width = bannerWidth + 'px';
        }
       //重新赋值ul位移距离
       //bannerUl.style.transform = -index * bannerWidth + 'px';
    };

    var timeId = setInterval(function(){
        index++;
        //过渡
        getTransition();
        //位移9
        setTransform();

    }, 2000);


    //解决滑动到最后一页连接第一张的问题
    //webkitTransitionEnd方法中过度时间bannerUl.style.transition = "all 1.5s";
    //必须过渡设置时间比定时器时间短才起作用
    bannerUl.addEventListener("webkitTransitionEnd", function(){
        if(index == 9){
            index = 1;
            //清除过渡
            removeTransitionend();
            //位移
            setTransform();
        } else if(index == 0){
            index = 8;
            //清除过渡
            removeTransitionend();
            //位移
            setTransform();
        }

        //点变
        setPoint();
    });

    //点变
    function setPoint(){
        //循环遍历
        for(var i = 0; i < points.length; i++){
            //清除样式
            points[i].classList.remove("now");
        }
        //添加样式
        points[index-1].classList.add("now");
    }

    //滑动事件
    //定义初识触摸值
    var startX = 0;
    //当为第一张图片时快速的再次拖动，时间短于设置的过渡事件，会发生bug，解决方法:
    //触摸开始
    bannerUl.addEventListener("touchstart", function(e){
        startX = e.targetTouches[0].clientX;
        clearInterval(timeId);
    }, { passive: true });

    //触摸移动
    //{ passive: true }添加属性，避免无法实现接触移动[5
    var distanceX = 0;
    var moveX = 0;
    bannerUl.addEventListener("touchmove", function(e){
        moveX = e.targetTouches[0].clientX;
        //计算移动距离
        distanceX = moveX - startX;
        //位移
        var translateX = -index * bannerWidth + distanceX;
        //清除过渡
        removeTransitionend();
        //移动
        //setTransform();
        //设置位移
        bannerUl.style.transform = "translateX("+ (translateX) + 'px' +")";
        //兼容写法
        bannerUl.style.webkitTransform = "translateX("+ (translateX) + 'px' +")";
        //e.preventDefault();
    }, { passive: true });

    //触摸结束, 还有一个touchcancel
    bannerUl.addEventListener("touchend", function(e){
        //吸附功能
        if(Math.abs(distanceX) < bannerWidth / 3){
            //添加过度效果
            getTransition();
            //位移
            setTransform();
        } else {
           if(distanceX < 0){
               index++;
           } else {
               index--;
           }
            //添加过度效果
            getTransition();
            //位移
            setTransform();
        }

        //触摸结束之后重新开启定时器
        clearInterval(timeId);
        timeId = setInterval(function(){
            index++;
            //过渡
            getTransition();
            //位移
            setTransform();

        }, 2000);

        //重置参数
        startX = 0;
        moveX = 0;
        distanceX = 0;

    });



}

//倒计时
function getTime(){
    var spans = document.querySelectorAll(".f_left > span");
    //设置倒计时时间
    var totalTime = 12 * 60 * 60;
    //设置定时器,定时器中的timeBack不能加()号
    var timeID = setInterval(timeBack, 1000);
    //利用闭包获取spans与totalTime，解决页面加载时隔1s时间显示问题
    timeBack();
    function timeBack(){
       totalTime--;
       //判断是否为0，为0则清除定时器
       if(totalTime == 0){
           clearInterval(timeID);
       }
       //计算剩余时间
       var hour = Math.floor(totalTime / 3600);
       var minute = Math.floor(totalTime % 3600 / 60);
       var second = Math.floor(totalTime % 60);
       //赋值
       spans[0].innerText = Math.floor(hour / 10);
       spans[1].innerText = Math.floor(hour % 10);
       spans[3].innerText = Math.floor(minute / 10);
       spans[4].innerText = Math.floor(minute % 10);
       spans[6].innerText = Math.floor(second / 10);
       spans[7].innerText = Math.floor(second % 10);
    }
}

