var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public"));

var message = [{
        id : 1,
        text : "Es un mensaje",
        author : "Christian Valencia"
}];

app.get("/", function (req , res) {
    res.status(200).render("index.html");
});

io.on("connection" , function (socket) {
   console.log("Coneccion abierta con socket"); 
   socket.emit("messages", message );
   socket.on("new-message" , function (data) { 
       message.push(data);
       io.sockets.emit("messages", message);
   });
});

server.listen(8080 , function () { 
   console.log("Server run in localhost 8080"); 
});