var socket = io.connect("http://192.168.130.23:8080",{forceNew:true});
socket.on("messages",function (data) {
    
    render(data);
});

function render(data) {
    
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