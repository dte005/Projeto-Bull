import 'dotenv/config';
import Queue from './lib/queue';
import LoginMail from './jobs/loginMail';

Queue.process(LoginMail.handle);
