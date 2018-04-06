var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var songList;
var audio = new root.AudioControl();


function bindTouch() {
    $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left,
        width = offset.width;
    $slider.on('touchstart', function () {
        root.progress.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0 || per > 1) {
            per = 0;
        }
        root.progress.touchProgress(per);
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0 || per > 1) {
            per = 0;
        }
        var curDuration = songList[controlManger.index].duration;
        var curTime = per * curDuration;
        audio.playTo(curTime);
        if (audio.status == 'play') {
            root.progress.start(); 
            audio.play();
        }
    })

}
function bindEvent() {
    $scope.on('audio:change', function (e) {
        var index = e._args;
        audio.getAudio(songList[index].audio);
        if (audio.status == 'play') {
            audio.play();
        }
        root.progress.renderTime(songList[index].duration);
        root.renderIsLike(songList[index].isLike)
    });
    $scope.on('audio:over', function (e) {
        audio.status = 'pause';
        // $scope.find('.play-btn').removeClass('playing');
        var index = controlManger.next(); 
        root.render(songList[index]);
        $scope.trigger('audio:change', index);
        root.progress.turnMusic();
        audio.play();
        $scope.find('.play-btn').addClass('playing');
        $('.list-box li').removeClass('active');
        $('.list-box li').eq(controlManger.index).addClass('active');
        root.progress.start();
    })
    $scope.on('click', '.list-close', function () {
        $('.songList').css('bottom', '-200px');
    })
    $scope.on('click', '.list-btn', function () {
        $('.songList').css('bottom', '0px');
    })
    $scope.on('click', '.list-box li', function () {
        $('.list-box li').removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        root.render(songList[index]);
        $scope.trigger('audio:change', index);
        root.progress.turnMusic(); 
        if (audio.status == 'play') {
            root.progress.start(); 
        }
        // console.log($(this).index())
    })
    $scope.on('click', '.like-btn', function () {
        var index = controlManger.index;
        if (!songList[index].isLike) {       
            $(this).addClass('liking');
            songList[index].isLike = true;
        } else {   
             $(this).removeClass('liking');
            songList[index].isLike = false;               
        }
    })
    $scope.on('click', '.play-btn', function () {
        if (audio.status == 'play') {
            audio.pause();
            $scope.find('.play-btn').removeClass('playing');
            root.progress.stop();
        } else {
            audio.play();
            $scope.find('.play-btn').addClass('playing');
         
            root.progress.start();       
        }
    })
    $scope.on('click', '.pre-btn', function () {
        // if (index == 0) {
        //     index = songList.length - 1;
        // } else {
        //     index --;
        // }
        var index = controlManger.prev();
        root.render(songList[index]);
        $scope.trigger('audio:change', index);
        root.progress.turnMusic(); 
        if (audio.status == 'play') {
            root.progress.start(); 
        }
    });
    $scope.on('click', '.next-btn', function () {
        // if (index == songList.length - 1) {
        //     index = 0;
        // } else {
        //     index ++;
        // }
        var index = controlManger.next(); 
        root.render(songList[index]);
        $scope.trigger('audio:change', index);
        root.progress.turnMusic();
        if (audio.status == 'play') {
            root.progress.start(); 
        } 
    })
}
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data)
            root.render(data[index]);
            songList = data;
            controlManger = new root.ControlManger(songList.length);
            bindEvent();      
            $scope.trigger('audio:change', 0);  
            bindTouch();    
        },
        error: function () {
            console.log('error');
        }
    })
}
getData('https://www.easy-mock.com/mock/5ab723902f46280e4ecd47fe/music/data');