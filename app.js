import 'dotenv/config';
import express from 'express';
import bull  from "./routes/bull";
import login from "./routes/login";
import path from "path";
import {page404} from "./middlewares/page404";
import {bdConnection} from "./bd/bdconnection";
import flash from 'connect-flash';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Bullboard from 'bull-board';
import Queue from './lib/queue';
import {redisConnection} from './bd/redis';

global.sequelize = bdConnection();
const client = redisConnection();
const app = express();

Bullboard.setQueues(Queue.queues.map(queue=>queue.bull));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Eu não conseguia capturar o body ate instalar esse cara
app.use(bodyParser.urlencoded({extended:true}));
app.use('/public', express.static('public'));
app.use(session({
    secret: 'bull',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(morgan('dev'));
app.use('/', bull);
app.use('/login', login);
app.use('/admin/queues', Bullboard.UI)
app.use(page404);

const server = require('http').createServer(app); //Formalizando o protocolo http
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

server.listen(process.env.PORT, ()=>{
    console.log("Rodando na porta 3000.");
});
