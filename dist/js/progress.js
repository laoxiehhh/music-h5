

(function ($, root) {
    var curDuration, iframe;
    var startTime = 0;
    var lastPer = 0;
    function formatTime(duration) {
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if (minute < 10) {
            minute = '0' + minute;
        }
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    function renderTime(duration) {
        curDuration = duration;
        var time = formatTime(duration);
        $scope.find('.all-time').html(time);
    }
    function updata(percent) {
        if (percent > 1) {
            // turnMusic();
            $scope.trigger('audio:over');
        } else {
            var time = formatTime(Math.round(percent * curDuration));        
            // console.log(time)
            $scope.find('.cur-time').html(time);
            var per = (percent - 1) * 100 + '%';
            $scope.find('.pro-top').css({
                'transform': 'translateX(' + per + ')'
            });
        }
    }
    function start() {
        
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = (curTime - startTime) / (curDuration * 1000) + lastPer;
            // if (percent >= 1) {
            //     root.progress.stop();
            // }
            iframe = requestAnimationFrame(frame);
            updata(percent);
        }
        frame();
    }
    function stop() {
        var stopTime = new Date().getTime();
        lastPer = (stopTime - startTime) / (curDuration * 1000) + lastPer;
        // if (lastPer >= 1) {
        // }
        cancelAnimationFrame(iframe);
    }
    function turnMusic() {
        cancelAnimationFrame(iframe);
        startTime = 0;
        lastPer = 0;
        updata(0);
    }
    function touchProgress(per) {
        cancelAnimationFrame(iframe);
        lastPer = per;
        updata(per);
    }
    root.progress = {
        renderTime: renderTime,
        start: start,
        stop: stop,
        turnMusic: turnMusic,
        touchProgress: touchProgress
    }
}(window.Zepto, window.player || (window.player = {})))