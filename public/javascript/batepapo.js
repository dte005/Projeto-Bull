//Cada vez que renderiza a pagina se conecta via socket
var socket = io('http://localhost:3000');
//Recupera o div que aparecerá as mensagens
const messagesDiv = document.getElementById('messages');
messagesDiv.innerHTML = ""; //limpa as mensagens ao recarregar a pagina
function renderMessage(message){
    messagesDiv.innerHTML += "<div style='margin-left:5px;'><strong>"+message.author+"</strong>: "+message.message+"</div>"
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

socket.on('previousMessages', function(messages){
    if(messages){
        messages.forEach(msg=>{
        renderMessage(msg);
        })
    }
     
})

socket.on('receviedMessage', function(message){
    renderMessage(message);
})

//Recupera o chat e verifica se existe mensagens e author
const chat = document.getElementById('chat');

chat.addEventListener('submit', function(event){
    event.preventDefault();
    const author = document.getElementById('username')
    const message = document.getElementById('message')

    if(author.value !== "" && message.value !== ""){
        var messageObject = {
            author: author.value,
            message: message.value
        }
        socket.emit('sendMessage', messageObject);
        renderMessage(messageObject);
    }
    message.value = "";
})