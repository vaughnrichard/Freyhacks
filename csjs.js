var pauseHandler = function() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING || player.getPlayerState() === YT.PlayerState.BUFFERING) {
        player.pauseVideo();
    }
}

var skipHandler = function() {
    player.stopVideo();
    playVideo("getnextfromqueue");
    //adjust queue, or increase counter for grabbing from db
}

//var backHandler = function() {
    //player.seekTo(seconds:0, allowSeekAhead:false);
//}

var playVideo = function (vidId) {
    var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '0',
          width: '0',
          videoId: vidId,
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
}


      // if video ends or skip it pressed, moved onto next in queue
document.getElementById('pause').onclick = pauseHandler;
document.getElementById('skip').onclick = skipHandler;
document.getElementById('back').onclick = backHandler;