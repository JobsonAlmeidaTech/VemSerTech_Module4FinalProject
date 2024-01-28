require("dotenv").config()
const express = require("express")
const routeCadastrarUsuario = require("./routes/CadastrarUsuario")
const routeLoginUsuario = require("./routes/LoginUsuario")
const routeCadastrarProduto = require("./routes/cadastrarProduto")
const routeEditarProduto = require("./routes/EditarProduto")
const mongooseInit = require("./configurations/MongooseConfigurations")

const app = express()
mongooseInit()

app.use(express.json())

app.use(routeCadastrarUsuario)
app.use(routeLoginUsuario)
app.use(routeCadastrarProduto)
app.use(routeEditarProduto)

//Welcome public route 
app.get("/", (req, res)=>{     
    res.status(200).json({
        msg: "Bem vindo à nossa API! Nesta API são disponibilizados dados referentes ao marketplace ABC Livros."
    })
}) 

// Lifting the server
const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`API rodando na porta ${PORT}`)
})