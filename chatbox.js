//<![CDATA[
//window.onload = function() {

  var messages = [];
  var socket = io.connect('http://152.7.99.43:8888');
  var chatmsg = document.getElementById("chatmsg");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");


  socket.on('message', function (data) {
    if(data.message) {
      messages.push(data.message);
      var html = '';
      for(var i=0; i<messages.length; i++) {
        html += messages[i] + '<br />';
      }
      content.innerHTML  = html;
    } else {
      console.log("There is a problem: ", data);
    }
  });

  sendButton.onclick = function() {
    var text = chatmsg.value;
    socket.emit('send', { message: text });
  };

//};

//]]>
