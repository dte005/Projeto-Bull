import Queue from 'bull';
import redisConfig from '../config/redis';
import LoginMail from '../jobs/loginMail';

const mailQueue = new Queue(LoginMail.key, redisConfig);

mailQueue.on('failed', (job, err)=>{
    console.log("Job failed", job.data);
    console.log(err);
})

module.exports = mailQueue;
