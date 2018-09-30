/**
 * Created by lenovo on 2018/8/29.
 */
//������ʹ��jQuery
window.onload = function(){
    //��������������Ч��
    topColor();

    //�ֲ�ͼ
    banner();

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

//�ֲ�ͼ
function banner(){
    //������װ
    function getTransition(){
        //���ù���
        bannerUl.style.transition = "all 1.5s";
        //����д��
        bannerUl.style.webkitTransition = "all 1.5s";
    }

    function setTransform(){
        //����λ��
        bannerUl.style.transform = "translateX("+ (-index * bannerWidth) + 'px' +")";
        //����д��
        bannerUl.style.webkitTransform = "translateX("+ (-index * bannerWidth) + 'px' +")";
    }

    function removeTransitionend(){
        //������ɣ�Ϊ��˲���ƶ�����һ��
        bannerUl.style.transition = "none";
        //����д��
        bannerUl.style.webkitTransition = "none";
    }

    //�޷����
    //����index
    var index = 1;
    //��ȡdomԪ��
    var jd_banner = document.querySelector(".jd_banner");
    var bannerUl = document.querySelector(".bannerUl");
    var bannerWidth = jd_banner.offsetWidth;
    var lis = document.querySelectorAll(".bannerUl > li");
    var points = document.querySelectorAll(".circle > li");

    //��window���ڸı��Сʱ
    window.onresize = function(){
       //���»�ȡbanner��Ⱥ�ul��li���
       bannerWidth = jd_banner.offsetWidth;
       bannerUl.style.width = lis.length * bannerWidth + 'px';
       for(var i = 0; i < lis.length; i++){
            lis[i].style.width = bannerWidth + 'px';
        }
       //���¸�ֵulλ�ƾ���
       //bannerUl.style.transform = -index * bannerWidth + 'px';
    };

    var timeId = setInterval(function(){
        index++;
        //����
        getTransition();
        //λ��9
        setTransform();

    }, 2000);


    //������������һҳ���ӵ�һ�ŵ�����
    //webkitTransitionEnd�����й���ʱ��bannerUl.style.transition = "all 1.5s";
    //�����������ʱ��ȶ�ʱ��ʱ��̲�������
    bannerUl.addEventListener("webkitTransitionEnd", function(){
        if(index == 9){
            index = 1;
            //�������
            removeTransitionend();
            //λ��
            setTransform();
        } else if(index == 0){
            index = 8;
            //�������
            removeTransitionend();
            //λ��
            setTransform();
        }

        //���
        setPoint();
    });

    //���
    function setPoint(){
        //ѭ������
        for(var i = 0; i < points.length; i++){
            //�����ʽ
            points[i].classList.remove("now");
        }
        //�����ʽ
        points[index-1].classList.add("now");
    }

    //�����¼�
    //�����ʶ����ֵ
    var startX = 0;
    //��Ϊ��һ��ͼƬʱ���ٵ��ٴ��϶���ʱ��������õĹ����¼����ᷢ��bug���������:
    //������ʼ
    bannerUl.addEventListener("touchstart", function(e){
        startX = e.targetTouches[0].clientX;
        clearInterval(timeId);
    }, { passive: true });

    //�����ƶ�
    //{ passive: true }������ԣ������޷�ʵ�ֽӴ��ƶ�[5
    var distanceX = 0;
    var moveX = 0;
    bannerUl.addEventListener("touchmove", function(e){
        moveX = e.targetTouches[0].clientX;
        //�����ƶ�����
        distanceX = moveX - startX;
        //λ��
        var translateX = -index * bannerWidth + distanceX;
        //�������
        removeTransitionend();
        //�ƶ�
        //setTransform();
        //����λ��
        bannerUl.style.transform = "translateX("+ (translateX) + 'px' +")";
        //����д��
        bannerUl.style.webkitTransform = "translateX("+ (translateX) + 'px' +")";
        //e.preventDefault();
    }, { passive: true });

    //��������, ����һ��touchcancel
    bannerUl.addEventListener("touchend", function(e){
        //��������
        if(Math.abs(distanceX) < bannerWidth / 3){
            //��ӹ���Ч��
            getTransition();
            //λ��
            setTransform();
        } else {
           if(distanceX < 0){
               index++;
           } else {
               index--;
           }
            //��ӹ���Ч��
            getTransition();
            //λ��
            setTransform();
        }

        //��������֮�����¿�����ʱ��
        clearInterval(timeId);
        timeId = setInterval(function(){
            index++;
            //����
            getTransition();
            //λ��
            setTransform();

        }, 2000);

        //���ò���
        startX = 0;
        moveX = 0;
        distanceX = 0;

    });



}

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

