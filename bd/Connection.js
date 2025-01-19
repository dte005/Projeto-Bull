import {Sequelize} from "sequelize";
import config from "../config/config";

class Connection{
    static on(){
        const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
            host: config.development.host,
            dialect: 'mysql'
        });

        sequelize.authenticate()
            .then(function(con){
                console.log("está conectado ao banco");
            })
            .catch(function(error){
                console.log(error);
            })

        return sequelize;
    }
}

export default Connection;
