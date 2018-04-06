(function ($, root) {
    function renderInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>\
        <div class="singer-name">' + info.singer + '</div>\
        <div class="album-name">' + info.album + '</div>';
        $scope.find('.song-info').html(html);
    }
    function renderImg(url) {
        var oImg = new Image();
        oImg.src = url;
        oImg.onload = function () {
            root.blurImg(oImg, $scope);
            $scope.find('.img-wrapper img').attr('src', url);
        }
    }
    function renderIsLike(isLike) {
        if (isLike) {
            $scope.find('.like-btn').addClass('liking');
        } else {
            $scope.find('.like-btn').removeClass('liking');
        }
    }
    root.render = function (data) {
        renderInfo(data);
        renderImg(data.images);
        renderIsLike(data.isLike);
    }
    root.renderIsLike = renderIsLike;
}(window.Zepto, window.player || ( window.player = {} )));