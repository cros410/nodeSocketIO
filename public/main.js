var socket = io.connect("http://192.168.130.23:8080",{forceNew:true});
socket.on("messages",function (data) {
    if(data.length>0){
        render(data);
    }
    
});

function render(data) {
    var long = data.length;
    notifyMe(data[long-1]);
    var html = data.map(function (elem , index) {
        
        return( `<div>
                    <strong>${elem.author}</strong>:
                    <em>${elem.text}</em>
                </div>`);
    }).join(" ");
    document.getElementById("mensajes").innerHTML = html;

}

function addMenssage(e) {
    var playLoad ={
        author : document.getElementById("username").value,
        text : document.getElementById("texto").value
    };
    socket.emit("new-message",playLoad);
    return false;

}


function notifyMe(mensaje) {

    var men = mensaje.text;
    var ico ;
    var titu = mensaje.author;
    
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("Navegador no soporte notificationes");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    //var notification = new Notification("Titutlo",mensaje.text);
    var n2 = spawnNotification(men , ico , titu);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
       //var notification = new Notification("Titutlo",mensaje.text);
       var n2 = spawnNotification(men , ico , titu);
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

Notification.requestPermission().then(function(result) {
  console.log(result);
});

function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
  return n;
}