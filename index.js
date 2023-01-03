const express = require("express"); // importei  framework express
const bodyParser = require("body-parser"); // e uma biblioteca traduzir os dados do formulario para recuperar os dados
const conn  = require("./database/database");
const Pergunta = require("./database/PerguntaModel")
const Resposta = require("./database/Resposta");

conn.authenticate()
    .then(()=>{
    console.log("conexao feita com banco de dados")
})
    .catch((erro)=>{
        console.log("Conexao erro: "+erro)
    })



const app = express();

// estou dizendo para o express usar o ejs como view engine
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false})) // decodificar os dados do formulario
app.use(bodyParser.json()) // usar json string

app.get("/",(req,res) => {
     Pergunta.findAll({raw:true,order:[["id","DESC"]]}).then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        })
     })
})

app.get("/perguntar",(req,res) => {
    res.render("perguntar")
})

app.get("/pergunta/:id",(req,res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
       
        if(pergunta){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [["id","DESC"]]
            }).then(respostas => {
                //console.log(respostas)
                res.render("pergunta",{pergunta,respostas})
            })
          
        } else {
            res.redirect("/")
        }
    }); 
})


app.post("/savequestion",(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.delescricao;
    Pergunta.create({
        titulo: titulo,
        descricao:  descricao
    }).then(() => {
        res.redirect("/")
    });
    //res.send(`Formulario recebido titulo: ${title} descrição: ${descrition}`)
})
app.post("/responder",(req,res) => {
   let corpo = req.body.corpo;
   let perguntaId = req.body.pergunta;
   Resposta.create({corpo,perguntaId}).then(() => {
            res.redirect(`/pergunta/${perguntaId}`);
   }).catch((erro) => {
        console.log("erro sistema");
   })
})
app.listen(8000,() => console.log("App Rodando!"))