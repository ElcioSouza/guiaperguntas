const express = require("express"); // importei  framework express

const app = express();

// estou dizendo para o express usar o ejs como view engine
app.set("view engine","ejs")
app.use(express.static("public"))

app.get("/:nome/:lang",(req,res) => {
    let nome = req.params.nome;
    let lang = req.params.lang;
    let exibirMsg = true
    const produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5},
        {nome: "Leite", preco: 1.45},
        {nome: "Carne", preco: 15},
        {nome: "Suco", preco: 4}
    ]
    res.render("principal/perfil",{
        nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8000,
        msg: exibirMsg,
        produtos:produtos
    })
})

app.listen(3000,() => console.log("App Rodando!"))