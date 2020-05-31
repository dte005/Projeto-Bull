module.exports = {
    key: 'userReport', //Nome do job
    options:{
        delay: 5000
    },
    handle: async function({data}){ //O que o job irá executar
        const {userInstance} = data;
        console.log(userInstance);
    }
}