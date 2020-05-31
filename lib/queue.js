import Queue from 'bull';
import redisConfig from '../config/redis';
//import * as jobs from '../jobs'
const jobs = require('../jobs');

//Precisamos transformas o jobs em um array"
const queues = Object.values(jobs).map(job=>({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle
}));

module.exports = {
    queues,
    add: function(name, data){
        const queue = this.queues.find(queue=>queue.name === name);
        return queue.bull.add(data);
    },
    process: function(){
        this.queues.forEach(queue=>{
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
