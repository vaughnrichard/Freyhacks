/*".search".addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        alert('Enter is pressed!');
    }
}); 

const node = document.getElementsByClassName("search")[0];
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        alert('Enter is pressed!');
    }
}); */

var process = function (e) {
    if (e.keyCode === 13){
      input = document.getElementById('search');
      console.log(input.value);

      
      input.value = '';
    }
}

document.getElementById('search').onkeyup = process;