//Criando a conexão com redis
import redis from 'redis';

exports.redisConnection = ()=>{
    
    const client = redis.createClient();
    //client.flushdb();
    client.on('error', function(error){
        console.log(error);
    })
    client.once('ready', function(){
        console.log("redis on!");
    })

    return client;
}
