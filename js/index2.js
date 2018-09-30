/**
 * Created by lenovo on 2018/8/29.
 */
//������ʹ��jQuery
window.onload = function(){
    //��������������Ч��
    topColor();

    //ʱ�䵹��ʱ
    getTime();
};

//��������
function topColor(){
    //����͸��Ч��
    var jd_searchBox = document.querySelector(".jd_searchBox");
    var jd_banner = document.querySelector(".jd_banner");
    //�����¼�
    window.onscroll = function(){
        //��ǰҳ���������
        //var top = document.body.scrollTop;
        //�ȸ����������뷽��
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

//zeptoʵ���ֲ�ͼ
$(function(){
    //��ȡԪ��
    var index = 1;
    //��ȡdomԪ��
    var jd_banner = $(".jd_banner");
    var bannerUl = $(".bannerUl");
    var bannerWidth = jd_banner.width();
    var lis = $(".bannerUl > li");
    var points = $(".circle > li");

    //�޷����
    //��window���ڸı��Сʱ
    $(window).resize(function(){
        //���»�ȡbanner��Ⱥ�ul��li���
        bannerWidth = jd_banner.width();
        bannerUl.width(lis.length * bannerWidth);
        //��ʽ�������Խ���󲿷���ͬ�Ĳ���
        lis.width(bannerWidth);
        //����ƫ��
        bannerUl.css("left", -index * bannerWidth);
        //each������ʾ����һ�������li����������ʱ������ʾ����
        //lis.each(function (index, value) {
        //    $(value).width(bannerWidth);
        //})
    });

    //��zepto��ֱ��ʹ��animate()ʵ��,animate�ǻ���css3��transition���з�װ,����fx JS���
    //1. ��Ҫ��Ӷ���Ч������ʽ��������
    //2. �����ĺ�ʱ
    //3. �������ٶȺ��� animation-timing-function
    //4. ��ǰ����ִ����Ϻ�Ļص�
    var imgAnimation = function(){
        bannerUl.animate(
            {"left": -index * bannerWidth},
            1000,
            "ease-in-out",
            function(){
                if(index == 9){
                    index = 1;
                    //λ��
                    bannerUl.css("left", -index * bannerWidth);
                } else if(index == 0){
                    index = 8;
                    //λ��
                    bannerUl.css("left", -index * bannerWidth);
                }
                //���
                setPoint();

                //��Ӷ�ʱ��
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

    //���
    function setPoint(){
        $(points).eq(index - 1).addClass("now").siblings("li").removeClass("now");
    }

    //zepto��Touch�¼�,��Ҫ����touch JS�ļ�
    //�󻬶�
    bannerUl.on("swipeLeft", function(){
        clearInterval(timeId);
        index++;
        timeId = undefined;
        imgAnimation();
    });
    //�һ���
    bannerUl.on("swipeRight", function(){
        clearInterval(timeId);
        index--;
        timeId = undefined;
        imgAnimation();
    });

});


//����ʱ
function getTime(){
    var spans = document.querySelectorAll(".f_left > span");
    //���õ���ʱʱ��
    var totalTime = 12 * 60 * 60;
    //���ö�ʱ��,��ʱ���е�timeBack���ܼ�()��
    var timeID = setInterval(timeBack, 1000);
    //���ñհ���ȡspans��totalTime�����ҳ�����ʱ��1sʱ����ʾ����
    timeBack();
    function timeBack(){
        totalTime--;
        //�ж��Ƿ�Ϊ0��Ϊ0�������ʱ��
        if(totalTime == 0){
            clearInterval(timeID);
        }
        //����ʣ��ʱ��
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        //��ֵ
        spans[0].innerText = Math.floor(hour / 10);
        spans[1].innerText = Math.floor(hour % 10);
        spans[3].innerText = Math.floor(minute / 10);
        spans[4].innerText = Math.floor(minute % 10);
        spans[6].innerText = Math.floor(second / 10);
        spans[7].innerText = Math.floor(second % 10);
    }
}

