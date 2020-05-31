import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

module.exports = nodemailer.createTransport(mailConfig);