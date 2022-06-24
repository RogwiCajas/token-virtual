const Sequelize = require("sequelize");
const db = require("./db");

const token_info = db.define(
    "token_info",
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING
        },
        usuario: {
            type: Sequelize.STRING
        },
        fecha_creacion: {
            type: "TIMESTAMP"
        }

    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    }
);

module.exports = token_info;