const Sequelize = require("sequelize")
const conn = require("./database")

const Resposta = conn.define("respostas",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false // campo nao vazio é obrigatorio. false nao nulo true permite campo nulo para inserir no banco de dados
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}) // force: false nao criar tabela caso ja existe 

module.exports = Resposta