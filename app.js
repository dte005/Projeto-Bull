//Para podermos usar o impor ao inves do require temos que utilizar o pacote sucrase para que todas
//features do ES6 possam ser utilizadas
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

global.sequelize = bdConnection();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Eu não conseguia capturar o body ate instalar esse cara
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: 'bull',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(morgan('dev'));
app.use('/bull', bull);
app.use('/', login);
app.use(page404);


app.listen(process.env.PORT, ()=>{
    console.log("Rodando na porta 3000.");
})
