const Sequelize = require("sequelize")
const conn = require("./database")

const Pergunta = conn.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false // campo obrigatorio do banco de dados colocamos false, true campo não obrigatorio
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(()=>{ // force: false se tabela ja existir ele não vai recriar tabela vai ser criado uma vez
    console.log("Tabela criado")
})

module.exports = Pergunta