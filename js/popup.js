var s = document.createElement('script'); 
s.type = 'text/javascript'; s.async = true; 
s.src = 'js/bot.js'; 
document.getElementById('botcopy-embedder-d7lcfheammjct').appendChild(s);

navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
      });