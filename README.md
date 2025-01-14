<h1> 🚀 Para que serve este repo ?</h1>
<p>Webapp de chat messages em tempo real</p>

<h3> 📋 O que ele possui ?</h3>
<ul>
 <li>Socket.io</li>
 <li>Node.js com controle de login</li>
 <li>Sistemas de filas com Bull</li>
 <li>Sistemas de filas com Redis</li>
</ul>

<h3> 📦 Para qual projeto ele foi feito ?</h3>
<p>Foi desenvolvido para o projeto de cadastro e login de usuarios assim como controle de envio de jobs em background e também um chat em tempo real</p>

<h3> 🛠️ Qual a estrutura do banco de dados ?</h3>

<a href="">tbd</a>

<h3> 🛠️ O que foi usado para construir ?</h3>
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Node.Js" alt="Nodejs" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original-wordmark.svg" title="Sequelize" alt="Sequelize" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original-wordmark.svg" title="Mysql" alt="Mysql" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redis/redis-original-wordmark.svg"title="Redis" alt="Redis" width="40" height="40"
</div>

<h3> 🔧 Instalação</h3>
Ter instalado localmente: mysql, node;
<br>
Primeiro eh necessário instalar suas dependências:

```
npm i
```

Depois criar localmente um banco de dados com nome de sua preferencia.
<br>
Rodar o sequelize e suas migrações:

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Instalar o Redis e rodar o serviço
```
brew services start redis 
```

✒️ Autor: @dte005
</br>
📄 Data: 13/01/2025
