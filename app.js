require("dotenv").config()
const express = require("express")
const routeCadastrarUsuario = require("./routes/CadastrarUsuario")
const routeLoginUsuario = require("./routes/LoginUsuario")
const routeCadastrarProduto = require("./routes/cadastrarProduto")
const mongoose = require("mongoose")

const bodyParser = require("body-parser")

//--Configurations:

    //ODM Mongoose
    mongoose.Promise = global.Promise
    const bancoNome = "ABCLivros"
    mongoose.connect(`mongodb://localhost:27017/${bancoNome}`)
    .then(()=>{
        console.log(`Conectado com sucesso ao banco de dados ${bancoNome}`)
    })
    .catch((erro)=>{
        console.log(`Houve um erro ao se conectar ao banco de dados ${bancoNome}` + erro)
    })



//--Loading middlewares

const app = express()

app.use(express.json())

// app.post("/cadastrarProduto", upload.single("photo"), (req, res)=>{
//     console.log("Entrou na app.CadastrarProduto")
// }) 

app.use(routeCadastrarUsuario)
app.use(routeLoginUsuario)
app.use(routeCadastrarProduto)

//Public route welcome
app.get("/", (req, res)=>{     
    res.status(200).json({
        msg: "Bem vindo à nossa API! Nesta API são disponibilizados dados referentes ao marketplace ABC Livros."
    })
}) 

// Lifting the server
const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`API rodando na porta ${PORT}`)
} )