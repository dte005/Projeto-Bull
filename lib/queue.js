/**
 * Modulo que cria e processa a fila criada
 */
import Queue from 'bull';
import redisConfig from '../config/redis';
//import * as jobs from '../jobs'
const jobs = require('../jobs');

//Precisamos transformas o jobs em um array"
const queues = Object.values(jobs).map(job=>({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options ? job.options : {}
}));

module.exports = {
    queues,
    add: function(name, data){
        const queue = this.queues.find(queue=>queue.name === name);
        return queue.bull.add(data, queue.options);
    },
    process: function(){ //processo a fila
        this.queues.forEach(queue=>{ //procuro qual a fila em questão
            queue.bull.process(queue.handle);
            queue.bull.on('failed', (job, err)=>{
                console.log("Job failed", queue.key, job.data);
                console.log(err);
            })

        })
    }
}

// import LoginMail from '../jobs/loginMail';

// const mailQueue = new Queue(LoginMail.key, redisConfig);

// mailQueue.on('failed', (job, err)=>{
//     console.log("Job failed", job.data);
//     console.log(err);
// })

// module.exports = mailQueue;
