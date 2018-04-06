(function ($, root) {
    function AudioControl() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioControl.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';         
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (time) {
            this.audio.currentTime = time;
        }   
    }
    root.AudioControl = AudioControl;
}(window.Zepto, window.player || (window.player = {})))