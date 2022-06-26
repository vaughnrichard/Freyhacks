var player;
var mainFunc = function(vidId, song, songl, artist, artistl) { // vid id, song, songl, artist, artistl
    // load first song, then while !player allow to play, else move next song to queue (like skipping), do cleaning <- this part should prob go outside of this
    // update song, artist in current song menu; also make everything visible
        document.getElementById("song").textContent = song;
        document.getElementById("song").setAttribute('href', songl);
        document.getElementById("song").style.color = "white";

        document.getElementById("artist").textContent = artist;
        document.getElementById("artist").setAttribute('href', artistl);
        document.getElementById("artist").style.color = "white";

        document.getElementById("pause").style.backgroundColor = "black";
        document.getElementById("skip").style.backgroundColor = "gray";
        document.getElementById("back").style.backgroundColor = "gray";
    
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
        console.log("22");
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('yt-player', { //this player tag corresponds to the tag player in html
              height: '0',
              width: '0',
              videoId: vidId,
              playerVars: {'autoplay' : 1},
              events: {
                  'onReady' : onPlayerReady,
                  'onStateChange': function(event) {
                      if (event.data === YT.PlayerState.ENDED) {
                          //player.playVideo(); // need to like exit or something
                      }
                  }
              }
            });
        }

        function onPlayerReady(event) {
            event.target.playVideo();
            event.target.setVolume(100);
            console.log("32");
        }
}

var pauseHandler = function() { // need to fix player issue, shouldnt be too bad just combine into one function
    if (player.getPlayerState() === YT.PlayerState.PLAYING || player.getPlayerState() === YT.PlayerState.BUFFERING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

var skipHandler = function() {
    player.stopVideo();
    playVideo("getnextfromqueue");
    //adjust queue, or increase counter for grabbing from db
}

var backHandler = function() {
    player.seekTo(0);
}

      // if video ends or skip it pressed, moved onto next in queue
document.getElementById('pause').addEventListener("click", pauseHandler);
document.getElementById('skip').addEventListener("click", skipHandler);
document.getElementById('back').addEventListener("click", backHandler);

mainFunc('F1B9Fk_SgI0', "Feels Like Summer", "Fhttps://www.youtube.com/watch?v=F1B9Fk_SgI0", "Childish Gambino", "https://www.youtube.com/channel/UC20LoHy2mX0LQODrkUalxVQ");
