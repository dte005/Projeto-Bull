module.exports = {
    key: 'userReport', //Nome do job
    handle: async function({data}){ //O que o job irá executar
        const {userInstance} = data;
        console.log(userInstance);
    }
}