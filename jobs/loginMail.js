/**
 * Arquivo de configuração do job particular
 */
import Mail from '../lib/mail';

module.exports = {
    key: 'loginMail', //Nome do job
    handle: async function({data}){ //O que o job irá executar
        const {user} = data;
        await Mail.sendMail({
            from: `Queue test <queue@teste.com>`,
            to: `${user.firstname} <${user.email}>`,
            subject: 'Cadastro de usuario',
            html: 'Olá, bem vindo ao nosso sistema!'
        })
    }
}