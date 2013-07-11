//<![CDATA[
window.onload = function() {

  var messages = [];
  var socket = io.connect('http://152.46.18.98:8888');
  var username = document.getElementById("username");
  var chatmsg = document.getElementById("chatmsg");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");


  socket.on('message', function (data) {
    if(data.message) {
      messages.push(data.message);
      var html = '';
      for(var i=0; i<messages.length; i++) {
        html += '<p>' +messages[i] + '</p> <br />';
      }
      content.innerHTML  = html;
    } else {
      console.log("There is a problem: ", data);
    }
  });

  sendButton.onclick = function() {
    var text = chatmsg.value;
    var usr = username.value;
    socket.emit('send', { message: usr + ": " + text });
  };
};
//]]>
