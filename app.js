import 'dotenv/config';
import express from 'express';
import bull  from "./routes/bull.router";
import login from "./routes/login.router";
import path from "path";
import pages from "./middlewares/page404";
import Connection from "./bd/Connection";
import flash from 'connect-flash';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Bullboard from 'bull-board';
import Queue from './lib/queue';
import socket from './sockets';

global.sequelize = Connection.on();
const app = express();

Bullboard.setQueues(Queue.queues.map(queue=>queue.bull));

app.set('views', path.join(__dirname, '/frontend/views'));
app.set('view engine', 'ejs');
//Eu não conseguia capturar o body ate instalar esse cara
app.use(bodyParser.urlencoded({extended:true}));
app.use('/frontend/javascript', express.static('frontend/javascript'));
app.use(session({
    secret: 'bull',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(morgan('dev'));
app.use('/', bull);
app.use('/login', login);
app.use('/admin/queues', Bullboard.UI);
app.use(pages.page404);

const server = require('http').createServer(app); //Formalizando o protocolo http

socket.init(app, server);

server.listen(process.env.PORT, ()=>{
    console.log(`Rodando na porta ${process.env.PORT}`);
});
