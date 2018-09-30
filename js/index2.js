/**
 * Created by lenovo on 2018/8/29.
 */
//尽量不使用jQuery
window.onload = function(){
    //顶部搜索栏渐变效果
    topColor();

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

//zepto实现轮播图
$(function(){
    //获取元素
    var index = 1;
    //获取dom元素
    var jd_banner = $(".jd_banner");
    var bannerUl = $(".bannerUl");
    var bannerWidth = jd_banner.width();
    var lis = $(".bannerUl > li");
    var points = $(".circle > li");

    //无缝滚动
    //当window窗口改变大小时
    $(window).resize(function(){
        //重新获取banner宽度和ul、li宽度
        bannerWidth = jd_banner.width();
        bannerUl.width(lis.length * bannerWidth);
        //隐式迭代可以解决大部分相同的操作
        lis.width(bannerWidth);
        //设置偏移
        bannerUl.css("left", -index * bannerWidth);
        //each方法显示遍历一般对所有li做不懂操作时，用显示遍历
        //lis.each(function (index, value) {
        //    $(value).width(bannerWidth);
        //})
    });

    //在zepto中直接使用animate()实现,animate是基于css3中transition进行封装,引入fx JS插件
    //1. 需要添加动画效果的样式——对象
    //2. 动画的耗时
    //3. 动画的速度函数 animation-timing-function
    //4. 当前动画执行完毕后的回调
    var imgAnimation = function(){
        bannerUl.animate(
            {"left": -index * bannerWidth},
            1000,
            "ease-in-out",
            function(){
                if(index == 9){
                    index = 1;
                    //位移
                    bannerUl.css("left", -index * bannerWidth);
                } else if(index == 0){
                    index = 8;
                    //位移
                    bannerUl.css("left", -index * bannerWidth);
                }
                //点变
                setPoint();

                //添加定时器
                if(timeId==undefined){
                    timeId = setInterval(function(){
                        index++;
                        imgAnimation();
                    },2000);
                }
            }
        );
    };


    var timeId = setInterval(function(){
        index++;
        imgAnimation();

    }, 2000);

    //点击
    function setPoint(){
        $(points).eq(index - 1).addClass("now").siblings("li").removeClass("now");
    }

    //zepto中Touch事件,需要引入touch JS文件
    //左滑动
    bannerUl.on("swipeLeft", function(){
        clearInterval(timeId);
        index++;
        timeId = undefined;
        imgAnimation();
    });
    //右滑动
    bannerUl.on("swipeRight", function(){
        clearInterval(timeId);
        index--;
        timeId = undefined;
        imgAnimation();
    });

});


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

