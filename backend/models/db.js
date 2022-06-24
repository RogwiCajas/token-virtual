const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

var sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false,
        port: "5433"
    }
);

sequelize.authenticate()
    .then(()=>{
        console.log("Conectado");
    })
    .catch((err)=>{
        console.error.bind(console, "Error de conexion: ");
    });

    module.exports = sequelize;