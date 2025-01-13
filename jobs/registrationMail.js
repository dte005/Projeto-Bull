/**
 * Arquivo de configuração do job particular
 */
import config from "../config/mail";
import fetch from "node-fetch";

module.exports = {
    key: 'registrationMail', //Nome do job
    options:{
        attemps: 3
    },
    handle: async function({data}){ //O que o job irá executar
        const {user} = data;
        config.template_params.send_to = user.email;
        config.template_params.from = user.firstname;
        config.template_params.title = "Você realizou o registro em nossa plataforma";
        config.template_params.action = "SIGNUP";
        const headers = {
            'Content-Type': 'application/json'
        }
        return await fetch(process.env.EMAILJS_URL,{method: "POST", body: JSON.stringify(config), headers})
            .then(res=>{
                if(res.status !== 200) {throw new Error(res.statusText)}
                return res;
            })
            .catch(e=>{throw new Error(e)})
    }
}