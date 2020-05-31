/**
 * Arquivo de configuração do job particular
 */
import Mail from '../lib/mail';

module.exports = {
    key: 'loginMail', //Nome do job
    options:{
        attemps: 3
    },
    handle: async function({data}){ //O que o job irá executar
        const {user} = data;
        await Mail.sendMail({
            from: `Queue test <queue@teste.com>`,
            to: `${user.firstname} <${user.email}>`,
            subject: 'Você acabou de logar em nossa plataforma',
            html: 'Olá, bem vindo ao nosso sistema!'
        })
    }
}