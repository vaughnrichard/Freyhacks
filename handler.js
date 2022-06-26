var checkEnter = function (e) {
    if (e.keyCode === 13){
      input = document.getElementById('search');
      //console.log(input.value);
      // send to NLP here, use nlp result for query
      // should grab songs for queue and grab an image for visualizer
      //searchFun(input.value);

      input.value = '';
    }
}

var listenHandler = function() {

  listen.textContent="Stop";

  navigator.mediaDevices.getUserMedia({ audio: true })
  //set up listening for audio and then look for another click (event handler or onclick), end audio look up, then use assembly to transcribe and feed it to nlp

  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const data = [];

    mediaRecorder.addEventListener("dataavaliable", event => {
      data.push(event.data);
    });

    document.getElementById('listen').onclick = function() {
      //mediaRecorder.stop(); need to figure out how to stop
      listen.textContent="Listen";
    }

    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(data);
      const urlVal = URL.createObjectURL(blob);

      //handle transcription - make sure to console.log whatever the transcription is to check that its working
      $.ajax({
        type:"POST",
        url: "./transcribe.py",
        dataType: "text",
        data: {param: urlVal},
        success: searchFun
      });

    });

  });
}

var searchFun = function(text) {
  console.log(text); // to ensure correct transmission

  const cohere = require('cohere-ai');
  cohere.init('{api_key}');
  (async () => {
    const response = await cohere.generate('large', {
      prompt: 'Find' + text + 'music',
      max_tokens: 20,
      temperature: 5,
      k: 0,
      frequency_penalty: 1,
      presence_penalty: 1
    });


    console.log(`Prediction: ${response.body.generations[0].text}`); // use while loop to go through all keywords, 
    //find songs corresponding to them and add them to queue; first song should be current song
    // only have time to update current song html; should change dataset on the div and refresh page to allow for new js to run
  })();
}

// loop this
//while (1) {
  //document.getElementById("body").style.backgroundColor = "white";
  document.getElementById('search').onkeyup = checkEnter;
  document.getElementById('listen').onclick = listenHandler;
//}