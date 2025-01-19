import redis from '../bd/redis';
export default {
    init: (app, server)=>{
        const client = redis.redisConnection();
        const io = require('socket.io')(server); //Formalizando o protocolo wss (websocket)

        io.on('connection', socket=>{
            console.log(`Socket conectado: ${socket.id}`);

            client.get('chatMessages', function(err, reply){
                socket.emit('previousMessages', JSON.parse(reply));
            });


            socket.on('sendMessage', data=>{
                let messages = [];
                client.get('chatMessages', function(err, reply){
                    var msgParse = JSON.parse(reply);
                    if(msgParse){
                        msgParse.forEach(msg=>{
                            messages.push(msg);
                        })
                    }
                    messages.push(data);
                    client.set('chatMessages', JSON.stringify(messages));
                    socket.broadcast.emit('receviedMessage', data);
                });
            })
        });
    }
}